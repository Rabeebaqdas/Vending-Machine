
import 'bulma/css/bulma.css';
import { useContext } from 'react';
import './App.css';
import { VendingMachine } from './context/VendingMachineContext';
function App() {
const {connectWallet,error,total,myDonuts,withDraw,setbuyDonuts,transfer,buying,success, Balance, msg,confrim , setmore,Refill,currentAccount,loading} = useContext(VendingMachine)
const owner = "0xbb45AF76f5198db4e38bA3668993c82739343c40" 
  return (
     
    <div>
       <nav className='navbar mt-4 mb-4'>
         <div className='container'>
           <div className='navbar-brand'>
             <h3>Vending Machine</h3>
           </div>
            
           <div className='navbar-end'>
           {currentAccount ? 
         <button className='button is-link'>{`${currentAccount.slice(0,5)}...${currentAccount.slice(currentAccount.length - 4)}`}</button>
         :
         <button className='button is-link' onClick={connectWallet} disabled= {loading}>Connect Wallet</button>
     
      }
           </div>
         </div>
       </nav>
       <section>
         <div className='container'>
        <h2>Number of Donuts in Vending Machine: {total}</h2>
         </div>
       </section>
       <section>
         <div className='container'>
        <h2>My Donuts: {myDonuts}</h2>
         </div>
       </section>
       <section>
         <div className='container mt-5'>
       <div className='field'>
         <label className='label'>Buy Donuts</label>
         <div className='control'>
           <input type="number" className='input' placeholder='Enter the amount of donuts you wants to buy...' onChange={(e)=>setbuyDonuts(e.target.value)} />
         </div>
             <button className='button is-primary mt-2' onClick={buying} disabled={loading}>Buy</button> <br/>
            
       </div>
         </div>
         <div className='container mt-5'>
    {currentAccount?.toLowerCase() == owner.toLowerCase() &&
      <div className='field'>
         <label className='label'>Refill Donuts</label>
         <div className='control'>
           <input type="number" className='input' placeholder='Enter the amount of donuts you wants to refill...' onChange={(e)=>setmore(e.target.value)} />
         </div>
             <button className='button is-primary mt-2' onClick={Refill} disabled={loading}>Refill</button><br />
      
             <button className='button is-primary mt-5' onClick={Balance} disabled={loading}>Balance</button><br />
             <div>
             <section>
         <div className='container mt-2' style={{color:'orange'}}>
           <p>{msg}</p>
         </div>
       </section>
             </div>
             <button className='button is-primary mt-5' onClick={withDraw} disabled={loading}>Withdraw</button><br />

    

       </div>
     
      }
         </div>
       </section>
       <section>
         <div className='container has-text-danger'>
           <p>{error}</p>
         </div>
       </section>
       <section>
         <div className='container has-text-success'>
           <p>{success}</p>
         </div>
       </section>
       <section>
         <div className='container has-text-success'>
           <p>{confrim}</p>
         </div>
       </section>
       <section>
         <div className='container has-text-success mt-2'>
           <p>{transfer}</p>
         </div>
       </section>
    

    </div>
  );
}

export default App;
