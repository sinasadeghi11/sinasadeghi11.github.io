import React from 'react';
import { DiCisco, DiCode, DiDebian, DiDoctrine, DiFirebase, DiReact, DiZend } from 'react-icons/di';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from './TechnologiesStyles';

const Technologies = () =>  (
  <Section id="tech">
    <SectionDivider />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      Technology is my passion. I have spent my life studying a wide range of software/hardware, with the aim
      of expressing my creativity through tech. 
    </SectionText>
    <List>
      <ListItem>
        <DiCode size="3rem" />
        <ListContainer>
          <ListTitle>Blockchain</ListTitle>
          <ListParagraph>Solidity<br />Javascript<br />Python<br />Moralis<br /></ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiDebian size="3rem" />
        <ListContainer>
          <ListTitle>3D Design</ListTitle>
          <ListParagraph>Level Design<br />Game Development<br />Virtual Reality<br />Arch Viz</ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiCisco size="3rem" />
        <ListContainer>
          <ListTitle>Sound Design</ListTitle>
          <ListParagraph>Soundtracks<br />Effects<br />Voice Overs</ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiDoctrine size="3rem" />
        <ListContainer>
          <ListTitle>Drones</ListTitle>
          <ListParagraph>3D Scans<br />Custom Software<br />Assembly<br />Repairs</ListParagraph>
        </ListContainer>
      </ListItem>
      
      
    </List>
  </Section>

);

export default Technologies;
