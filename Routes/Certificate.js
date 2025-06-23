const route = require('express').Router();
const certificate = require('../MongooseActions/Certificate')
route.post('/getCertificate', async(req,res)=>{
    const   certifiCateId = req.body.id;
    console.log("Certificate no", certifiCateId)
    // res.json({
    //         name: 'HIRAN HUSSAIN',
    //         description: 'OSHA GENERAL INDUSTRY - 30Hrs',
    //         issuedBy: 'IQ-OHS',
    //         certificationNo: 'IQ-263438',
    //         dateOfIssue: '29/Mar/2024',
    //         validThrough: 'Life Time',
    //       })
    // console.log("Certificate id is", id)
    try {
        const response = await certificate.fetchCertificate(certifiCateId);
        console.log("Response is", response.data);
        if(response.status == 1){
            res.status(200).json(response.data)
        }else{
            res.status(500).json(response.message)
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
})

route.post('/saveCertificate', async(req,res)=>{
    const formData = req.body;
    // console.log("Data to save", formData)
    // res.send("Success")
    try {
        const response = await certificate.saveCertificate(formData);
        if(response == 1){
            res.status(200).json({status:1, message:"Success"})
        }else{
            res.status(500).json({status:0, message:"Internal server error"})
        }
    } catch (error) {
        res.status(500).json({status:0, message:error.message})
    }
})

route.post('/getAllCertificate',async(req,res)=>{
    // console.log("Searching")
    try {
        const allCert = await certificate.getAllCertificate();
        res.status(200).json(allCert)
    } catch (error) {
        console.log("Fail to fetch all certificatte", error.message)
        res.status(500).send("Fail")
    }
})



module.exports = route