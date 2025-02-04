import { clerkPlugin } from "@clerk/vue";

export default ({ app }) => {
  const frontendApi = "pk_test_c3VwZXItYmFzaWxpc2stMzguY2xlcmsuYWNjb3VudHMuZGV2JA";

  if (!frontendApi) {
    console.error("Clerk Frontend API is not defined");
    return;
  }

  app.use(clerkPlugin, { publishableKey:frontendApi });
};