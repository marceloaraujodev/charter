import { NextResponse } from 'next/server';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebaseInit from '@/app/utils/firebaseInit';
import uploadImages from '@/app/utils/uploadImages';
import multer from 'multer';

// Multer configuration to save files to the tmp directory.
const upload = multer({ dest: '/tmp/' }); // Change destination if needed

export async function POST(req, res) {
  try {
    const formData = await req.formData();
    const file = formData.get('files');
    // const newFileName = file.name.split(' ').join('')
    // file.name = newFileName
    console.log('this is file', file)

    if (!file) {
      return NextResponse.json({ status: "fail", data: "No file uploaded" });
    }

    firebaseInit();

    const storage = getStorage();
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET; // Replace with your storage bucket name
    const storageRef = ref(storage, storageBucket);
    const fileRef = ref(storageRef, file.name);

    const uploadImage = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadImage.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done'); 
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error); 

            });
        }
      );
    })
    .then((downloadURL) => {
      return NextResponse.json({ status: "success", data: { url: downloadURL } });
    })
    .catch((error) => {
      return NextResponse.json({ status: "fail", data: error });
    });

  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}

