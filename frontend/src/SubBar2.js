import './App.css';
import NearMe from './NearMe';


const SubBar2 = ({state, setCategory, toggleDropdown, onZipChange, fetchStores}) => {
    return (
        <div>
            {/* <hr style={{color:"blue"}} className='black ma0 pa0' /> */}
            <nav className='pa1 f6' style={{alignItems: "center", justifyItems : "center",color: "white",backgroundColor: "#001b44F1",display: 'grid', gridTemplateColumns:"0.22fr repeat(12, auto)"}}>
                {/* <text className='ml2 near-white'>Fresh Produce </text> */}
                {/* {state.dropdown && (
                    <div> <NearMe toggleDropdown={toggleDropdown} fetchStores={fetchStores} onZipChange={onZipChange}/> </div>)}
                <text className='ml2 pointer dim near-white' onClick={toggleDropdown}>Stores Near Me</text>
                <text className='ml2 pointer dim  near-white' onClick={() => setCategory(true, 'fruits vegetables')}>Fresh Produce </text>
                <text className='ml2 pointer dim  near-white' onClick={() => setCategory(true, 'bakery cakes dairy')}>Dairy & Baked Foods</text>
                <text className='ml2 pointer dim  near-white' onClick={() => setCategory(true, 'snacks branded foods')}>Snacks & Branded Foods</text>
                <text className='ml2 pointer dim  near-white' onClick={() => setCategory(true, 'beverages')}>Beverages</text>
                <text className='ml2 pointer dim  near-white' onClick={() => setCategory(true, 'eggs meat fish')}>Eggs & meat</text>
                <text className='ml2 pointer dim  near-white' onClick={() => setCategory(true, 'cleaning household')}>Home Improvement </text> */}
                <text id='msg' className='ml2 pointer dim  near-white' > </text>
                {/* {(state.user.role == 'sm')
                ?<text className='ml2 near-white'> Admin </text>
                :<div> </div>} */}
            </nav>
            
            
        </div>)
}

export default SubBar2;