import { useNavigate } from 'react-router-dom';
const RequestsComponent = () => {
    const navigate = useNavigate();
  
    return (
      <div className="component">
        <h2>Requests Component</h2>
        <button onClick={() => navigate('/create-request')}>Create Request</button>
        <button onClick={() => navigate('/requests-to-us')}>Requests to Us</button>
        <button onClick={() => navigate('/requestsstatus')}>Request Status</button>
      </div>
    );
  };
  
  export default RequestsComponent;