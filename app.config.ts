import AppwriteConfig from './appwrite.json';

export default defineAppConfig({
  appwrite: {

  },
  endpoint: 'http://localhost/v1',
  application: AppwriteConfig.projectId,
  databaseId: AppwriteConfig.collections[0].databaseId,
  collectionId: AppwriteConfig.collections[0].$id,
});
