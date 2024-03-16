import React, { useEffect } from 'react'
import axios from 'axios';

import { Box, Container, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

import { loadMercadoPago } from "@mercadopago/sdk-js";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFees } from '../store/slice'
import { CreditScore, Lock } from '@mui/icons-material';

await loadMercadoPago();

const Query520 = () => {
    const matches = useMediaQuery('(max-width:520px)')
    return matches
  }


const Purchase = () => {
   
  const fees = useSelector(state => state.fees.fees)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getFees = async () => {
    await axios.get('http://localhost:3001/commerce')
      .then((res) => {
        console.log(res.data)
        if(res.data[0] === "ok"){
          const aggFees = {
            shipping: res.data[1].shipping,
            tax: res.data[1].tax
          }
          dispatch(addFees(aggFees))
        } else {
            Swal.fire({
              title: "Something went wrong",
              confirmButtonText: "Got it",
              confirmButtonColor:"#90caf9",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/')
              }
            })
        }
      })
  }
  
  const products = useSelector(state => state.cart.products)

  const totalProdAmount = () => {
    let totalAmount = 0

    products.map((value) =>
    totalAmount += (value.quantity * value.price))

    totalAmount = totalAmount.toFixed(2)
    //console.log(totalAmount);
    return totalAmount
  }

  const shippingAmount = () => {

    console.log("shippingFee", fees[0].shipping)
    let totalShipping = 0

    products.map((value) =>
    totalShipping += (value.quantity * value.weight * fees[0].shipping))

    totalShipping = totalShipping.toFixed(2)
    return totalShipping

  }

  const taxesAmount = () => {

    console.log("taxFee", fees[0].tax)
    let totalTaxes = 0

    products.map((value) =>
    totalTaxes += (value.quantity * value.price * (fees[0].tax/100)))

    totalTaxes = totalTaxes.toFixed(2)
    return totalTaxes

  }

  const finalTotal = () => {
    let total = Number(totalProdAmount()) + Number(shippingAmount()) + Number(taxesAmount())
    total = total.toFixed(2)
    return total
  }

  const auth = async () => {

    axios.get('http://localhost:3001/header', { withCredentials: true })

      .then((res) => {
        //console.log(res.data)
        if(res.data[0] === "no-session"){
            navigate('/')
        } else if (res.data[0] === "session"){
          axios.post("http://localhost:3001/purchaseValid", {
          body:{
            products,
            totalProdAmount: totalProdAmount(),
            shippingAmount: shippingAmount(),
            taxesAmount: taxesAmount(),
            finalTotal: finalTotal()
          }
          })
          .then((res)=>{
            console.log(res.data)
            if(res.data !== "valid"){
              navigate('/')
              window.location.reload()
            }
          })
          .catch((err)=>{
            Swal.fire({
              icon:"error",
              title: "Something went wrong",
              confirmButtonText: "Got it",
              confirmButtonColor:"#90caf9",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/')
              }
            })
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          icon:"error",
          title: "Something went wrong",
          confirmButtonText: "Got it",
          confirmButtonColor:"#90caf9",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/')
            window.location.reload()
          }
        })
      })
  }

  useEffect(()=>{
    getFees()
    auth()
    const mp = new window.MercadoPago("TEST-cddb0ff2-8b83-4b7d-bfbd-1f82f550da2e")
    const cardForm = mp.cardForm({
        amount: finalTotal(),
        iframe: true,
        form: {
            id: "form-checkout",
            cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Card Number",
            },
            expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/YY",
            },
            securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Security Code",
            },
            cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Cardholder Name",
            },
            issuer: {
            id: "form-checkout__issuer",
            placeholder: "Bank",
            },
            installments: {
            id: "form-checkout__installments",
            placeholder: "Installments",
            },        
            identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Identification Type",
            },
            identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Identification Number",
            },
            cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
            },
        },
        callbacks: {
            onFormMounted: error => {
              if (error) {
                Swal.fire({
                  icon:"error",
                  title: "Something went wrong",
                  confirmButtonText: "Got it",
                  confirmButtonColor:"#90caf9",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate('/')
                  }
                })
              }
            },
            onSubmit: event => {
            event.preventDefault();

            const cardData = cardForm.getCardFormData();
            //console.log(cardData);
            let amount = Number(cardData.amount)
            let cardholderEmail = cardData.cardholderEmail
            let identificationNumber = cardData.identificationNumber
            let identificationType = cardData.identificationType
            let installments = Number(cardData.installments)
            let issuerId = cardData.issuerId
            let paymentMethodId = cardData.paymentMethodId
            let token = cardData.token

            let boughtProducts = []
            products.forEach((value) => {
                boughtProducts.push(value.name+" "+value.size+" "+value.color+" ("+value.quantity+")")
            })
            let boughtProductsString = "["+boughtProducts.toString()+"]"

            axios.post("http://localhost:3001/purchaseValid", {
              body:{
                products,
                totalProdAmount: totalProdAmount(),
                shippingAmount: shippingAmount(),
                taxesAmount: taxesAmount(),
                finalTotal: finalTotal()
              }
            })
            .then((res)=>{
              console.log(res.data)
              if(res.data === "valid"){
                axios.post("http://localhost:3001/process_payment", {
                headers: {
                "Content-Type": "application/json",
                },
                body: {
                  token,
                  issuerId,
                  paymentMethodId,
                  transaction_amount: amount,
                  installments: installments,
                  description: boughtProductsString,
                  payer: {
                      cardholderEmail,
                      identification: {
                      type: identificationType,
                      number: identificationNumber,
                      },
                  },
                }
                })
                .then((resPayment) => {
                    //console.log('resPayment.data', resPayment.data)
                    if(resPayment.data.status === "approved"){

                      axios.get('http://localhost:3001/header', { withCredentials: true })
                        .then((res) => {
                          //console.log(res.data)
                          if(res.data[0] === "session"){
                            let userId = res.data[1].id
                            let firstName = res.data[1].firstName
                            let lastName = res.data[1].lastName
                            let email = res.data[1].email

                            products.map((value) => {
                              axios.post('http://localhost:3001/addPurchase', {
                              body:{
                                purchase_id: resPayment.data.id,
                                user_id: userId,
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                cardEmail: cardholderEmail,
                                payment_method: paymentMethodId,
                                payment_type: resPayment.data.payment_type_id,
                                product: value,
                                currency: resPayment.data.currency_id,
                                transaction_amount: amount,
                                installments: installments,
                                date_created: resPayment.data.date_created,
                              }
                            })
                            .catch((err) => {
                              Swal.fire({
                                title: "Your purchase has been made successfully, but notify the business",
                                confirmButtonText: "Great!",
                                confirmButtonColor:"#90caf9",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  navigate('/')
                                  window.location.reload()
                                }
                              })
                            })
                          })

                          Swal.fire({
                            title: "Your purchase has been made successfully",
                            confirmButtonText: "Great!",
                            confirmButtonColor:"#90caf9",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              navigate('/')
                              window.location.reload()
                            }
                          })
                        
                          } else {
                            navigate('/')
                          }

                        })
                      

                    } else if (resPayment.data.status === "in_process"){
                      if(resPayment.data.status_detail === "pending_contingency"){
                        Swal.fire({
                          title: "Don't worry, we will notify you by email in less than 2 business days if it has been approved",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.data.status_detail === "pending_review_manual"){
                        Swal.fire({
                          title: "Don't worry, we will notify you by email within 2 business days if it has been approved or if we need more information",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      }
                    } else if (resPayment.status === "rejected"){
                      if(resPayment.status_detail === "cc_rejected_bad_filled_card_number"){
                        Swal.fire({
                          title: "Check the card number",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        })
                      } else if (resPayment.status_detail === "cc_rejected_bad_filled_date"){
                        Swal.fire({
                          title: "Check the expiration date",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        })
                      } else if (resPayment.status_detail === "cc_rejected_bad_filled_other"){
                        Swal.fire({
                          title: "Review the data",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        })
                      } else if (resPayment.status_detail === "cc_rejected_bad_filled_security_code"){
                        Swal.fire({
                          title: "Check the card security code",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        })
                      } else if (resPayment.status_detail === "cc_rejected_blacklist"){
                        Swal.fire({
                          icon:"error",
                          title: "We could not process your payment",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_call_for_authorize"){
                        Swal.fire({
                          title: "You must authorize payment to "+paymentMethodId,
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_card_disabled"){
                        Swal.fire({
                          title: "Call "+paymentMethodId+" to activate your card or use another payment method",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_card_error"){
                        Swal.fire({
                          icon:"error",
                          title: "We could not process your payment",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_duplicated_payment"){
                        Swal.fire({
                          icon:"error",
                          title: "You have already made a payment for that amount, use another card",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_high_risk"){
                        Swal.fire({
                          title: "Choose another payment method, we recommend cash",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_insufficient_amount"){
                        Swal.fire({
                          icon:"error",
                          title: "No enough funds",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_invalid_installments"){
                        Swal.fire({
                          icon:"error",
                          title: paymentMethodId+" does not process payments in "+installments+" installments",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_max_attempts"){
                        Swal.fire({
                          icon:"error",
                          title: "You have reached the limit of allowed attempts. Choose another card or other payment method",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else if (resPayment.status_detail === "cc_rejected_other_reason"){
                        Swal.fire({
                          icon:"error",
                          title: "We could not process your payment",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      } else {
                        Swal.fire({
                          icon:"error",
                          title: "We could not process your payment",
                          confirmButtonText: "Got it",
                          confirmButtonColor:"#90caf9",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate('/')
                            window.location.reload()
                          }
                        })
                      }
                    }
                })
                .catch((err)=> {
                  Swal.fire({
                    icon:"error",
                    title: "Something went wrong",
                    confirmButtonText: "Got it",
                    confirmButtonColor:"#90caf9",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate('/')
                      window.location.reload()
                    }
                  })
                })
              } else {
                navigate('/')
              }
            })
            .catch((err)=>{
              Swal.fire({
                icon:"error",
                title: "Something went wrong",
                confirmButtonText: "Got it",
                confirmButtonColor:"#90caf9",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/')
                  window.location.reload()
                }
              })
            })
            
            },
            onFetching: (resource) => {
            console.log("Fetching resource: ", resource);

            // Animate progress bar
            const progressBar = document.querySelector(".progress-bar");
            progressBar.removeAttribute("value");

            return () => {
                progressBar.setAttribute("value", "0");
            };
            }
        },
    })
    window.onpopstate = () => {
        Swal.fire({
            title: "Purchase has been cancelled",
            confirmButtonText: "Got it",
            confirmButtonColor:"#90caf9",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/')
              window.location.reload()
            }
          })
    }
  },[])

  return (
    <Container maxWidth="xl" sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", m:"20px auto"}}>

        <Typography variant='h3' p={2} sx={{backgroundColor:"#202020", borderTopRightRadius:"5px", borderTopLeftRadius:"5px", width:"100%"}}>Payment</Typography>

        <Grid container justifyContent="center" sx={{backgroundColor:"#252525", m:"0 auto", borderBottomRightRadius:"5px", borderBottomLeftRadius:"5px", p:"10px 10px 30px 10px"}}>

                <Grid item xs={12} md={5}>
                    <Typography variant='h5'  sx={{pt:"15px"}}>You're buying these products</Typography>
                    {
                        products.map((value) =>
                            <Box sx={Query520() ? {margin:"0px 0px 0px 0px"} : {margin:"0px 0px 0px 60px"}}>
                                <Box sx={Query520() ? {display:"flex", justifyContent:'center'} : {display:"flex", justifyContent:'flex-start'}}>
                                    <Typography variant='p' sx={{pt:"15px", pr:"12px"}}>{value.name}</Typography>
                                    <Typography variant='p' sx={{pt:"15px", pr:"12px"}}>{value.size}</Typography>
                                    <Typography variant='p' sx={{pt:"15px", pr:"12px"}}>{value.color}</Typography>
                                    <Typography variant='p' sx={{pt:"15px", pr:"12px"}}>({value.quantity})</Typography>
                                    
                                </Box>
                                <Divider sx={Query520() ? {width:"100%"} : {width:"60%"}}/>
                            </Box>
                        )
                    }
                    <Typography variant='h4' alignItems="center" sx={{pt:"20px"}}><CreditScore/> To pay {finalTotal()}</Typography>
                </Grid>

                <Grid item xs={12} md={5}>
                    <form id="form-checkout">
                        <Typography variant='h5' sx={{pt:"15px", pl:"12px"}}>Card information</Typography>
                        <Box sx={{width:"100%", display:"flex", mt:"10px", justifyContent:"center"}}>
                            <div id="form-checkout__cardNumber" className="containerMp"></div>
                        </Box>
                        <Box sx={{width:"100%", display:"flex", mt:"10px", justifyContent:"center"}}>
                            <div id="form-checkout__expirationDate" className="containerMp mrMP"></div>
                            <div id="form-checkout__securityCode" className="containerMp"></div>
                        </Box>

                        <Typography variant='h5' sx={{pt:"15px", pl:"12px"}}>Payment information</Typography>
                        <Box sx={{width:"100%", display:"flex", mt:"10px", justifyContent:"center"}}>
                            <select id="form-checkout__issuer" className="containerMp mrMP"></select>
                            <select id="form-checkout__installments" className="containerMp"></select>
                        </Box>

                        <Typography variant='h5' sx={{pt:"15px", pl:"12px"}}>Personal</Typography>
                        <Box sx={{width:"100%", display:"flex", mt:"10px", justifyContent:"center"}}>
                            <input type="text" id="form-checkout__cardholderName" className="containerMp" />
                        </Box>
                        <Box sx={{width:"100%", display:"flex", mt:"10px", justifyContent:"center"}}>
                            <select id="form-checkout__identificationType" className="containerMp mrMP"></select>
                            <input type="text" id="form-checkout__identificationNumber" className="containerMp"/>
                        </Box>
                        <Box sx={{width:"100%", display:"flex", mt:"10px", justifyContent:"center"}}>
                            <input type="email" id="form-checkout__cardholderEmail" className="containerMp" />
                        </Box>
                        <Box sx={{width:"100%", display:"flex", mt:"10px", justifyContent:"center"}}>
                            <button type="submit" id="form-checkout__submit" className="buttonMp"><Lock sx={{mr:"3px"}}/>Pay</button>
                        </Box>
                        <Box sx={{width:"100%", display:"none", mt:"10px", justifyContent:"center"}}>
                            <progress value="0" className="progress-bar">Cargando...</progress>
                        </Box>

                        
                    </form>
                </Grid>

        </Grid>

    </Container>
    
  )
}

export default Purchase
