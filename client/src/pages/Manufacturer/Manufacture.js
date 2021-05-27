import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Manufacturer(props){
    // const web3 = props.web3;
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;

    const [roleInput, setRoleInput] = React.useState("");
    const [manuForm, setManuForm] = React.useState({
        id: 0,
        manufacturerName: "",
        manufacturerDetails: "",
        manufacturerLongitude: "",
        manufacturerLatitude: "",
        productName: "",
        productCode: 0,
        productPrice: 0,
        productCategory: ""
    });
    const [manuProds, setManuProds] = React.useState([]);

    // React.useEffect(() => {
    //     (async () => {
    //     const val = await supplyChainContract.methods.fetchManufacturedProduct().send({ from: accounts[0], gas:100000 })
    //     setManuProds(val)
    //     console.log(manuProds)
    //     }) ()
    // }, [])

    const handleRoleFieldChange = async ({target}) => {
        setRoleInput(target.value);
    }

    const handleAddManufacturerRole = async () => {
        console.log(roleInput);
        await supplyChainContract.methods.addManufacturerRole(accounts[6]).send({ from: accounts[4], gas:100000 })
        .then(console.log);
      
        setRoleInput("");
    }

    const handleChangeManufacturerForm = async (e) => {
        setManuForm({
            ...manuForm,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitManufacturerForm = async () => {
        console.log(parseInt(manuForm.id));
        await supplyChainContract.methods.manufactureProduct( manuForm.manufacturerName, manuForm.manufacturerDetails, manuForm.manufacturerLongitude, manuForm.manufacturerLatitude, manuForm.productName, parseInt(manuForm.productCode), parseInt(manuForm.productPrice), manuForm.productCategory).send({ from: accounts[6], gas:999999 }).then(console.log);
    }

    const fetchManufacturedProduct = async () => {
        // const nm = await supplyChainContract.methods.fetchProductCount().call();
        // console.log(nm);
        const test = await supplyChainContract.methods.fetchProductPart1(3, "product", 0).call().then(console.log);
        console.log(test);
    }

    return (
        <>
        <h1>Add role to manufac</h1>
        <input 
        type="text" 
        name="roleInput"
        value={ roleInput }
        onChange={ handleRoleFieldChange }
        />
        <button onClick={handleAddManufacturerRole}>ADD ROLE</button>

        <br/>

        <h2>Manufacture Prod Form</h2>
        <TextField
            name="id"
            variant="outlined"
            value={manuForm.id}
            onChange={handleChangeManufacturerForm}
            label="id"
            />
            <TextField
            name="manufacturerName"
            variant="outlined"
            value={manuForm.manufacturerName}
            onChange={handleChangeManufacturerForm}
            label="manufacturerName"
            />
            <TextField
            name="manufacturerDetails"
            variant="outlined"
            value={manuForm.manufacturerDetails}
            onChange={handleChangeManufacturerForm}
            label="manufacturerDetails"
            />
            <TextField
            name="manufacturerLongitude"
            variant="outlined"
            value={manuForm.manufacturerLongitude}
            onChange={handleChangeManufacturerForm}
            label="manufacturerLongitude"
            />
            <TextField
            name="manufacturerLatitude"
            variant="outlined"
            value={manuForm.manufacturerLatitude}
            onChange={handleChangeManufacturerForm}
            label="manufacturerLatitude"
            />
            <TextField
            name="productName"
            variant="outlined"
            value={manuForm.productName}
            onChange={handleChangeManufacturerForm}
            label="productName"
            />
            <TextField
            name="productCode"
            variant="outlined"
            value={manuForm.productCode}
            onChange={handleChangeManufacturerForm}
            label="productCode"
            />
            <TextField
            name="productPrice"
            variant="outlined"
            value={manuForm.productPrice}
            onChange={handleChangeManufacturerForm}
            label="productPrice"
            />
            <TextField
            name="productCategory"
            variant="outlined"
            value={manuForm.productCategory}
            onChange={handleChangeManufacturerForm}
            label="productCategory"
            />
             <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmitManufacturerForm}
            >
                SUBMIT
            </Button>

        <br/>

        <h2>Manufactured Prods</h2>
        <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={fetchManufacturedProduct}
            >
                TEST FETCH
            </Button>
        </>
    );
}