import {
  Document,
  VectorStoreIndex,
  serviceContextFromDefaults,
  storageContextFromDefaults,
} from "llamaindex";

export async function createOrReadVectorStoreIndex(
  pdfText?: string,
): Promise<VectorStoreIndex> {
  const document = new Document({ text: pdfText});
  
  const storageContext = await storageContextFromDefaults({
    persistDir: "./storage",
  });

  const serviceContext = serviceContextFromDefaults({
    chunkSize: 2000,
    chunkOverlap: 500,
  });

  console.log("Creating index");

  const index = await VectorStoreIndex.fromDocuments(pdfText ? [document] : [], {
    storageContext,
    serviceContext,
  });

  console.log("Index created");
  return index;
}