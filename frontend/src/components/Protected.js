import { Navigate } from 'react-router-dom';

function Protected({ loggedIn, children }) {
  return loggedIn ? children : <Navigate to='/signin' replace />;
}

export default Protected;
