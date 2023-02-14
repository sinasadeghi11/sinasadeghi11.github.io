import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

import anime from '/node_modules/animejs/lib/anime.es.js';
import Letterize from "/node_modules/letterizejs/lib/letterize.js";

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
      <div id="animateMe">
        Virtual Design
        </div>  
      </SectionTitle>
      <SectionText>
      The Web as I envisaged it, <br />
      we have not seen it yet. <br />
       The future is still so much, <br />
       bigger than the past. <br />
       -Tim Berners-Lee <br /><br /><br />
      </SectionText>
      <Button onClick={() => window.location = 'https://google.com'}>Contact</Button>
    </LeftSection>
  
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
  </Section>
  
);

export default Hero;

