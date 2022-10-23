import bkg1 from '../../images/bkg1.jpeg'
import {container, backdrop} from './styles'

const Features = () => {
  return (
    <div style={container}>
    
    <div style={backdrop}></div>
    <img style={{ height: '100%', width: '100%'}} src={bkg1} alt='bkg pic' />
    </div>
  )
}

export default Features