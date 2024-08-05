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

    if (!file) {
      return NextResponse.json({ status: "fail", data: "No file uploaded" });
    }

    firebaseInit();

    const storage = getStorage();
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET; // Replace with your storage bucket name
    const storageRef = ref(storage, storageBucket);
    const fileRef = ref(storageRef, file.name);

    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done'); 
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
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

// export async function POST(req, res){

//   try {
//     const { }
//   } catch (error) {
    
//   }


// //   try {
// //     const formData = await req.formData();
// //     const file = formData.getAll('files')[0];
// //     console.log(file);

// //     if (!file) {
// //       return NextResponse.json({ status: "fail", data: "No file uploaded" });
// //     }

// //     // Upload to Firebase
// //     const downloadURL = await uploadImages(file);

// //     console.log('downloadURL', downloadURL)
 
// //     // upload to firebase

// //    // Create a Blob
// //     // const blob = new Blob([file], { type: 'image/jpeg' });
// //     // await uploadImages(fileStream, filePath);
  
// //   return NextResponse.json({ status: "success", data: { url: downloadURL} });
// // } catch (error) {
// //     return NextResponse.json({ status: "fail", data: error });
// // }
// }