// import React, {useEffect, useState} from 'react';
// import {SafeAreaView, Text, Button, Alert} from 'react-native';
// import emv from 'node-emv';
// import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// const Login = () => {
//   const [cardInfo, setCardInfo] = useState(null);

//   useEffect(() => {
//     // Initialize NFC Manager
//     NfcManager.start();
//   }, []);


//   const readCreditCard = async cardType => {
//     try {
//       await NfcManager.cancelTechnologyRequest();
//     } catch (error) {
//       // Handle the error if necessary
//     }

//     try {
//       // Commands for Visa or MasterCard based on cardType
//       const commands =
//         cardType === 'Visa'
//           ? [
//               '00A404000E325041592E5359532E444446303100',
//               '00A4040007A000000003101000',
//               '80A80000238321F620C00000000000000100000000000007240000000000097823112300194E172C00',
//               '80A800002383212800000000000000000000000000000002500000000000097820052600E8DA935200',
//               '80CA9F1700',
//               '80CA9F3600',
//             ]
//           : [
//               '00A4040007A000000004101000',
//               "80A8000002830000",
//               "00B2011400",
//               "00B2010C00",
//               "00B2012400",
//               "00B2022400"
//             ];

//       await NfcManager.requestTechnology([NfcTech.IsoDep]);

//       const responses = [];

//       for (let i = 0; i < commands.length; i++) {
//         const resp = await NfcManager.isoDepHandler.transceive(
//           toByteArray(commands[i]),
//         );
//         responses.push(resp);
//       }
      

//       if (responses && responses.length > 2) {
//         const r = await getEmvInfo(toHexString(responses[2]));
//         if (r) {
//           const cardInfo =
//             cardType === 'Visa' ? getCardInfoVisa(r) : getCardInfoMasterCard(r);
//           if (cardInfo) {
//             setCardInfo(cardInfo);
//             console.log(cardInfo);
//             Alert.alert(
//               'Card Info',
//               `Card Number: ${cardInfo.card}\nExpiry: ${cardInfo.exp}`,
//             );
//           } else {
//             Alert.alert('Error', 'Failed to read card info.');
//           }
//         } else {
//           Alert.alert('Error', 'Failed to get EMV info.');
//         }
//       } else {
//         Alert.alert('Error', 'Failed to get responses.');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to read the card.' + error);
//     } finally {
//       NfcManager.cancelTechnologyRequest();
//     }
//   };

//   const getEmvInfo = info => {
//     return new Promise(resolve => {
//       // Assuming `emv` is a library that you are using to describe the EMV data
//       emv.describe(info, data => {
//         if (data) {
//           resolve(data);
//         } else {
//           resolve(null);
//         }
//       });
//     });
//   };

//   const toByteArray = text => {
//     return text.match(/.{1,2}/g).map(b => parseInt(b, 16));
//   };

//   const toHexString = byteArr => {
//     return byteArr.reduce((acc, byte) => {
//       return acc + ('00' + byte.toString(16).toUpperCase()).slice(-2);
//     }, '');
//   };

//   const getCardInfoVisa = responses => {
//     let res;
//     let end = false;
//     for (let i = 0; i < responses.length; i++) {
//       const r = responses[i];
//       if (r.tag == '77' && r.value && r.value.length > 0) {
//         for (let j = 0; j < r.value.length; j++) {
//           const e = r.value[j];
//           if (e.tag == '57' && e.value) {
//             const parts = e.value.split('D');
//             if (parts.length > 1) {
//               res = {
//                 card: parts[0],
//                 exp: parts[1].substring(0, 4),
//               };
//               end = true;
//             }
//           }

//           if (end) break;
//         }

//         if (end) break;
//       }
//     }
//     return res;
//   };

//   const getCardInfoMasterCard = responses => {
//     let res;
//     let end = false;
//     for (let i = 0; i < responses.length; i++) {
//       const r = responses[i];
//       if (r.tag === '70' && r.value && r.value.length > 0) {
//         for (let j = 0; j < r.value.length; j++) {
//           const e = r.value[j];
//           if (e.tag === '57' && e.value) {
//             const parts = e.value.split('D');
//             if (parts.length > 1) {
//               res = {
//                 card: parts[0],
//                 exp: parts[1].substring(0, 4),
//               };
//               end = true;
//             }
//           }

//           if (end) break;
//         }

//         if (end) break;
//       }
//     }
//     return res;
//   };

 

//   return (
//     <SafeAreaView
//       style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Button
//         title="Read Visa Credit Card"
//         onPress={() => readCreditCard('Visa')}
//       />
//       <Button
//         title="Read MasterCard Credit Card"
//         onPress={() => readCreditCard('MasterCard')}
//       />
//       {cardInfo && (
//         <Text style={{marginTop: 20}}>
//           Card Number: {cardInfo.card}
//           {'\n'}
//           Expiry: {cardInfo.exp}
//         </Text>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Login;