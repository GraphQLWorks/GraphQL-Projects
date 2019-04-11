import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { parseMarkdown } from "../markdownUtils";
import { Link } from "@reach/router";

const GET_JOB = gql`
  {
    jobs_by_pk(id: 10) {
      id
      company
      description
      link_to_apply
    }
  }
`;

const ApplyLink = styled.a`
  padding: 10px;
  background: red;
  color: white;
  text-decoration: none;
`;
const ApplyContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const BackButton = styled(Link)`
  color: gray;
`;

const JobContainer = styled.div`
  margin: 20px;
`;

function Job(params) {
  const { data, error, loading } = useQuery(GET_JOB);
  if (loading) {
    return <h1>Loading...</h1>;
  } else if (data) {
    const { description, id, company, link_to_apply } = data.jobs_by_pk;
    let convertedDescription = parseMarkdown(description);
    return (
      <JobContainer>
        <BackButton to="/"> Back to search </BackButton>
        <h1>Work for {company}</h1>
        <ReactMarkdown source={convertedDescription} />
        <ApplyContainer>
          <ApplyLink href={link_to_apply}>Apply Now</ApplyLink>
        </ApplyContainer>
      </JobContainer>
    );
  }
}

export default Job;
