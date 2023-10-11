import Popup from './Popup';

function InfoTooltip(props) {
  return (
    <Popup {...props}>
      <div className='tooltip'>
        <img src={props.img} alt='Representação visual da mensagem abaixo' />
        <h2 className='tooltip__text'>{props.text}</h2>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
