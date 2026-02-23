const express = require("express");
const router = express.Router();
const transaction = require("../models/transaction");

//test route

router.get("/", async(request, response)=>{
    // response.send("Route is working");
    try{
        console.log("Query: ", request.query);
        const filter = {};

        if(request.query.transactionType === "income"){
            filter.transactionType = "income";
        }
        if(request.query.transactionType === "expense"){
            filter.transactionType = "expense";
        }
        const transactions = await transaction.find(filter);

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
        balance,
        selectedType: request.query.transactionType || ""
     })
    }catch(e){
        response.status(500).send(e.message)
    }
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

//delete a transaction
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

//edit transaction
router.get("/edit/:id", async(req, res)=>{
    const transactionToEdit = await transaction.findById(req.params.id);
    res.render("edit", { transactionToEdit })
})

router.put("/edit/:id", async(req, res)=>{
    try{
        await transaction.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/api");
    }
    catch(e){
        console.log(e);
        res.send("Error updating details.")
    }
    
})












module.exports = router;