import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";



export const init = async ({landmarkerRef,streamRef,videoRef,setExpression}) => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU",
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    });

    startCamera({streamRef,videoRef,setExpression});
  };

export const startCamera = async ({streamRef,videoRef,setExpression}) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    streamRef.current = stream;
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
  } catch {
    setExpression("Camera access denied ❌");
  }
};

 export const detect = ({videoRef,landmarkerRef,detectExpression,lastExpressionRef,setExpression}) => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    if (!video || !landmarker) return;

    const results = landmarker.detectForVideo(video, performance.now());

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;
      const label = detectExpression(blendshapes);
      if (label !== lastExpressionRef.current) {
        lastExpressionRef.current = label;
        setExpression(label);
      }
    }

  };
