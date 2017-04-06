import React from 'react';

export default class ReactHomeCarousel extends React.Component {
    render() {
        return (
            <div className="light-wrapper">
                <div className="tp-fullscreen-container revolution">
                  <div className="tp-fullscreen">
                    <ul>
                      <li data-transition="fade"> <img src="resources/images/instruments.jpg"  alt="" data-bgposition="center top" data-bgfit="cover" data-bgrepeat="no-repeat" />
                        <div className="tp-caption main-title sfl" data-x="350" data-y="263" data-speed="600" data-start="500" data-endspeed="100" data-easing="Sine.easeOut">Hello! This is</div>
                        <div className="tp-caption main-title sft" data-x="650" data-y="263" data-speed="600" data-start="1000" data-endspeed="100" data-easing="Sine.easeOut"><strong>BoSWE</strong></div>
                        <div className="tp-caption lead sfl text-center" data-x="center" data-y="337" data-speed="600" data-start="1500" data-endspeed="100" data-easing="Sine.easeOut">Designed with simplicity in mind.</div>
                        <div className="tp-caption lead sfr text-center" data-x="center" data-y="377" data-speed="600" data-start="2000" data-endspeed="100" data-easing="Sine.easeOut">To sate your every musical desire.</div>
                        <div className="tp-caption sfb" data-x="center" data-y="450" data-speed="600" data-start="2500" data-easing="Sine.easeOut"  data-endspeed="100"><a href="about.html" className="btn btn-border">Meet the Team</a></div>
                      </li>
                      <li data-transition="fade"> <img src="resources/images/microphone2.jpg" alt="" bgfit="cover" data-bgposition="center top" data-bgrepeat="no-repeat" />
                        <div className="tp-caption main-title light-layer sfb" data-x="center" data-y="293" data-speed="900" data-start="800" data-endspeed="100" data-easing="Sine.easeOut">Craving a certain<strong> song?</strong></div>
                        <div className="tp-caption lead light-layer sfb text-center" data-x="center" data-y="387" data-speed="900" data-start="1500" data-endspeed="100" data-easing="Sine.easeOut">We'll deliver it straight to your ears.</div>
                        <div className="tp-caption sfb" data-x="center" data-y="500" data-speed="600" data-start="2500" data-easing="Sine.easeOut"  data-endspeed="100"><a href="tracksTable.html" className="btn btn-border">Listen to This</a></div>
                      </li>
                      <li data-transition="fade"> <img src="resources/images/concert.jpg" alt="" data-bgfit="cover" data-bgposition="center top" data-bgrepeat="no-repeat" />
                        <div className="tp-caption main-title light-layer sfb" data-x="center" data-y="293" data-speed="900" data-start="800" data-endspeed="100" data-easing="Sine.easeOut">Hungry for a particular<strong> Artist?</strong></div>
                        <div className="tp-caption lead light-layer sfb text-center" data-x="center" data-y="387" data-speed="900" data-start="1500" data-endspeed="100" data-easing="Sine.easeOut">We have the finest selections prepared.</div>
                        <div className="tp-caption sfb" data-x="center" data-y="525" data-speed="600" data-start="2500" data-easing="Sine.easeOut"  data-endspeed="100"><a href="artistTable.html" className="btn btn-border">Expand your Taste</a></div>
                      </li>
                    </ul>
                    <div className="tp-bannertimer tp-bottom"></div>
                  </div>
                </div>
              </div>
        );
    }
}