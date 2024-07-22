
import { BarLoader } from 'react-spinners';
import { ClipLoader } from'react-spinners';
export default function Spinner() {
  return (
    <>
    {/* <BarLoader
    color='#42ADF8'
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
    speedMultiplier={1}
  /> */}
  <ClipLoader 
    color='#42ADF8'
    size={50}
    aria-label="Loading Spinner"
    data-testid="loader"
    speedMultiplier={1}
  />
  </>
  )
}
