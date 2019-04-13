import gql from 'graphql-tag';
export default gql`
    mutation deleteCompany($id: ID) {
        deleteCompany(id: $id) {
            id
        }
    }
`;
