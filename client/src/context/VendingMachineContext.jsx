import { ethers } from "ethers";
import { useState, useEffect, createContext } from "react";
import { contractAddress, contractAbi } from '../utils/constants';
export const VendingMachine = createContext();

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const vendingMachineContract = new ethers.Contract(contractAddress, contractAbi, signer);
    return vendingMachineContract;

}

const { ethereum } = window;
export const VendingMachineProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [total, setTotal] = useState();
    const [myDonuts, setMyDonuts] = useState();
    const [buyDonuts, setbuyDonuts] = useState();
    const [msg,setMsg] = useState('');
    const [more,setmore] = useState('');
    const [confrim,setconfrim] = useState('');
    const [transfer,settransfer] = useState('');


    useEffect(() => {
        checkIsWalletConnected();
        quantity();
        myDounts();
    }, [])

    ethereum.on("accountsChanged", async(account) => {
        setCurrentAccount(account[0]);
        quantity();
        myDounts();
    })

    const checkIsWalletConnected = async () => {
        try {
            if (!ethereum) return alert("please install MetaMask");
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("Account", accounts[0])
            } else {
                console.log("No account Found");
            }
        } catch (err) {
            setError(err.message);
            throw new Error("No ethereum Object");
        }
    }



    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);

        } catch (err) {
            setError(err.message);
            throw new Error("No ethereum object");
        }
    }


    const quantity = async () => {
        const donuts = await getEthereumContract().checkQuantity();
        setTotal(parseInt(donuts._hex));

    }

    const myDounts = async () => {
        try {
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                const donuts = await getEthereumContract().donut(accounts[0])
                setMyDonuts(parseInt(donuts._hex));
            }
        } catch (err) {
            setError(err.message);
            throw new Error("No ethereum Object");
        }
    }

    const buying = async () => {
        setError('')
        setSuccess('')
        setMsg('')
        setconfrim('')
        settransfer('')
        try {

            var load = await getEthereumContract().purchase(buyDonuts, {
                from: currentAccount,
                value: ethers.utils.parseEther(buyDonuts),
                gasLimit: 3000000,
                gasPrice: null
            })
           await load.wait();
           setMyDonuts('');
            setSuccess(`${buyDonuts} ${buyDonuts > 1 ? "Donuts" : "Donut"} Purchased`);
           if(getEthereumContract()) quantity();
           if(getEthereumContract() && currentAccount) myDounts();
        }
        catch (err) {
            console.log(err)
            setError(err.message);
        }
    }

    const Balance = async() => {
        const balance = await getEthereumContract().checkBalance();
        setMsg(`The Balance of Vending Machine is : ${parseInt(ethers.utils.formatEther(balance._hex))} Ether`)
    }


    const Refill = async() => {
        setError('')
        setSuccess('')
        setMsg('')
        setconfrim('')
        settransfer('')
        try{
            var load = await getEthereumContract().restock(more,{
                from: currentAccount,
                gasLimit: 3000000,
                gasPrice: null
            })
            await load.wait();
            setmore("");
            setconfrim("Donuts refilled successfully");
            if(getEthereumContract()) quantity();
            

        }catch(err){
            setError(err.message);
        }
    }

    const withDraw = async() => {
        setError('')
        setSuccess('')
        setconfrim('')
        settransfer('')
        try{
            var withdraw = await getEthereumContract().getBalance({
                gasLimit: 3000000,
                gasPrice: null
                
            })
            await withdraw.wait();
            settransfer("Amount has been successfully transfered to our account");
            if(getEthereumContract()) Balance();
        }catch(err){
            setError("Vending Machine balance is zero");
        }
    } 



    return (

        <VendingMachine.Provider value={{ connectWallet, error, total, myDonuts,withDraw, setbuyDonuts,currentAccount,confrim, buying, success,Refill, Balance, msg, setmore,transfer }}>
            {children}
        </VendingMachine.Provider>
    )
}

