export const getUserQuery = `
 query GetUser($email: String!) {
  user(by: {email: $email}) {
    id
    name
    email
    avatarUrl
    description
    githubUrl
  }
 }
`;

export const createUserMutation = `
 mutation CreateUser($input: UserCreateInput!) {
  userCreate(input: $input) {
    user {
      name
      email
      avatarUrl
      description
      githubUrl
      id
    }
  }
 }
`;

export const getCalculationQuery = `
  query GetCalculation($id: ID!) {
    calculation(by: { id: $id }) {
      expression
      result
      calculatedBy {
        id
        name
        email
      }
    }
  }
`;

export const createCalculationMutation = `
  mutation CreateCalculation($input: CalculationCreateInput!) {
    calculationCreate(input: $input) {
      calculation {
        expression
        result
        calculatedBy {
          id
          name
          email
        }
      }
    }
  }
`;

export const getNoteQuery = `
 query GetUser($email: String!) {
  user(by: {email: $email}) {
    notes(first: 100) {
      edges {
        node {
          content
          category
          tags
          isDone
        }
      }
    }
  }
 }
`;

export const createNoteMutation = `
  mutation CreateNote($input: NoteCreateInput!) {
    noteCreate(input: $input) {
      note {
        content
        category
        tags
        isDone
        author {
          id
          name
          email
        }
      }
    }
  }
`;
