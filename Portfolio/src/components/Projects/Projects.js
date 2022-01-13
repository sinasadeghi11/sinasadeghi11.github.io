import React from 'react';

import { BlogCard, CardInfo, ExternalLinks, GridContainer, HeaderThree, Hr, Tag, TagList, TitleContent, UtilityList, Img } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';

const Projects = () => (
  <Section nopadding id="crypto">
    <SectionDivider />
    <SectionTitle main>Projects</SectionTitle>
    <GridContainer>
      {projects.map(({ id, image, title , description, tags, source, visit, pos}) => (
        <BlogCard key={id}>
          <div style={{width: '100%', height: '20rem', layout:'responsive', objectFit:'contain', backgroundColor:'white'}}>
          <Img src={image}/>
          </div>
          <br />
          <TitleContent>
            <HeaderThree title>{title}</HeaderThree>
            <div>{pos}</div>
            <Hr />
          </TitleContent>
          <CardInfo>{description}</CardInfo>
          <div>
          <Hr />
            <TitleContent>Stack</TitleContent>
            <TagList>
              {tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </TagList>
          </div>
          <UtilityList>
            <ExternalLinks href={visit}>Visit</ExternalLinks>
          </UtilityList>
        </BlogCard>
         
      ))}
    </GridContainer>
  </Section>
);

export default Projects;