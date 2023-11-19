import keycloak from "../config/keycloak";

export const authenticate = keycloak.middleware();
