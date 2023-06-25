import { useNavigate } from 'react-router-dom';
import './index.css'

const drawerWidth = 240;

export default function PermanentDrawerLeft({children}:{children:React.ReactNode}) {

  const navigate = useNavigate();

  const routes = [
    {
        id:'/',
        name:'Home',
    },
    {
    name:'Categories',
    id:'categories'
    },
    {
    name:'Vehicles',
    id:'vehicles'
    }
    
  ]


  return (
    <div className="App">
    <div className="sidebar">
      <ul>
        {routes.map(i=>
        <li onClick={()=>navigate(`../${i.id}`,{replace:true})}>{i.name}</li>)
        }
      </ul>
    </div>
    <div className="content">
      {children}
    </div>
  </div>
);

}