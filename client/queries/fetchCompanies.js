import gql from 'graphql-tag';

export default gql`
    {
        companies {
            id
            name
            person
            www
            wechat
            description
          }
    }
`;