const express = require("express");
const router = express.Router();
const transaction = require("../models/transaction");

//test route

router.get("/", async(request, response)=>{
    // response.send("Route is working");
    const transactions = await transaction.find();
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((x)=>{
        if(x.transactionType === "income"){
            totalIncome += x.amount;
        }else{
            totalExpense += x.amount;
        }
    });
    const balance = totalIncome - totalExpense;
    response.render("home", { 
        transactions,
        totalIncome,
        totalExpense,
        balance
     })
});

//add transaction
router.post("/add", async(req, res)=>{
    console.log("BODY:", req.body);
    try{
        await transaction.create(req.body);
        res.redirect("/api");
    }
    catch(error){
        console.log("ERROR:", error);
        res.status(500).json(error);
    }
});

//fetch all transactions
router.get("/all", async(req, res)=>{
    try{
        const allTransacs = await transaction.find();
        res.status(200).json(allTransacs)
    }
    catch(e){
        res.status(500).json(
            {message: e.message},
            {code: e.status}
        )
    }
});

//delete transaction
router.delete("/delete/:id", async(req,res)=>{
    
    try{
        const transactionToBeDeleted = await transaction.findByIdAndDelete(req.params.id);
        res.redirect("/api")
    }catch(e){
        return res.status(500).send(e.message);
    }
});

//filter by transaction type
router.get("/filterbytype", async(req, res)=>{
    try{
        const {transactionType} = req.query;
        const transType = await transaction.find({ transactionType })
        return res.json(transType);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
})















module.exports = router;