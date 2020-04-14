import React ,{Component} from 'react';
import TopMenuBar from './components/menu';
import './styles/mainFrame.css';
class Lecturer extends Component  {


    render(){
      return (
        <div >
          <div className = 'Menubar'>
            <TopMenuBar />
          </div>
          <div className = 'title'>
            <p> My Modules　</p>
          </div>
          <div className = 'moduleBox'>
            <div className = 'optionSelectorBox'>
              <h2>
                OPTION SELECTOR BOX
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Id ornare arcu odio ut sem nulla pharetra diam. Tincidunt ornare massa eget egestas purus viverra. Nunc lobortis mattis aliquam faucibus purus in. Condimentum lacinia quis vel eros donec ac odio tempor orci. Cras semper auctor neque vitae tempus quam pellentesque nec. Accumsan tortor posuere ac ut. Enim sit amet venenatis urna cursus eget nunc scelerisque. Egestas sed tempus urna et pharetra pharetra massa massa. Sem et tortor consequat id. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nullam non nisi est sit amet facilisis magna etiam tempor. Phasellus vestibulum lorem sed risus ultricies tristique. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Justo donec enim diam vulputate ut pharetra sit amet. Facilisis mauris sit amet massa vitae tortor. Dignissim sodales ut eu sem integer vitae justo. Tortor vitae purus faucibus ornare suspendisse. Pharetra vel turpis nunc eget lorem dolor. A iaculis at erat pellentesque adipiscing commodo elit. Sed pulvinar proin gravida hendrerit lectus a. Sed felis eget velit aliquet sagittis. Pretium lectus quam id leo in. Mi eget mauris pharetra et ultrices neque ornare aenean. Gravida neque convallis a cras semper auctor neque vitae tempus. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor.
              </p>
            </div>
            <div className = 'breakDownSelectorBox'>
              <h2>
                BREAKDOWN SELECTOR BOX
              </h2>
            </div>
            <div className = 'detailBox' >
              <h2>
                DETAIL BOX
              </h2>
            </div>

          </div>
        </div>
      );
    }

}

  export default Lecturer;
