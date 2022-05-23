
import 'bulma/css/bulma.css';
import { useContext } from 'react';
import './App.css';
import { VendingMachine } from './context/VendingMachineContext';
function App() {
const {connectWallet,error,total,myDonuts,withDraw,setbuyDonuts,transfer,buying,success, Balance, msg,confrim , setmore,Refill,currentAccount} = useContext(VendingMachine)

  return (
     
    <div>
       <nav className='navbar mt-4 mb-4'>
         <div className='container'>
           <div className='navbar-brand'>
             <h3>Vending Machine</h3>
           </div>
            
           <div className='navbar-end'>
        <button className='button is-link' onClick={connectWallet}>Connect Wallet</button>
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
             <button className='button is-primary mt-2' onClick={buying}>Buy</button> <br/>
            
       </div>
         </div>
         <div className='container mt-5'>
    { currentAccount == "0xfdb039899f5bfeac8bc3cd898a0e807d31849fde" &&
      <div className='field'>
         <label className='label'>Refill Donuts</label>
         <div className='control'>
           <input type="number" className='input' placeholder='Enter the amount of donuts you wants to refill...' onChange={(e)=>setmore(e.target.value)} />
         </div>
             <button className='button is-primary mt-2' onClick={Refill}>Refill</button><br />
      
             <button className='button is-primary mt-5' onClick={Balance}>Balance</button><br />
             <div>
             <section>
         <div className='container mt-2' style={{color:'orange'}}>
           <p>{msg}</p>
         </div>
       </section>
             </div>
             <button className='button is-primary mt-5' onClick={withDraw}>Withdraw</button><br />

    

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
