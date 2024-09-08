export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("newTabDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("images", { keyPath: "id" });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("Error opening database: " + event.target.errorCode);
    };
  });
}

export async function saveImageToIndexedDB(blob, id, fileName) {
  const db = await openDatabase();
  const transaction = db.transaction("images", "readwrite");
  const store = transaction.objectStore("images");
  const imageRecord = { id, imageBlob: blob, fileName };
  return await new Promise((resolve, reject) => {
    const request = store.put(imageRecord);

    request.onsuccess = () => resolve("Image saved successfully!");
    request.onerror = (event) =>
      reject("Error saving image: " + event.target.errorCode);
  });
}

export async function getImageFromIndexedDB(id) {
  const db = await openDatabase();
  const transaction = db.transaction("images", "readonly");
  const store = transaction.objectStore("images");
  return await new Promise((resolve, reject) => {
    const request = store.get(id);

    request.onsuccess = (event) => {
      const response = {
        imageBlob: event.target.result?.imageBlob || null,
        name: event.target.result?.fileName || null,
      };
      resolve(response);
    };
    request.onerror = (event_1) =>
      reject("Error retrieving image: " + event_1.target.errorCode);
  });
}
