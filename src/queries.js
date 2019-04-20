import gql from "graphql-tag";
export const ADD_VEHICLE = gql`
  mutation AddVehicle($name: String!) {
    insert_vehicle(objects: { name: $name }) {
      returning {
        id
      }
    }
  }
`;

export const ADD_LOCATION = gql`
  mutation AddLocation($vehicleId: String!, $location: String!) {
    insert_vehicle_location(
      objects: { vehicle_id: $vehicleId, location: $location }
    ) {
      returning {
        id
      }
    }
  }
`;