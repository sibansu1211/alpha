// your-custom-script.js

// Define global variables for the scene, camera, and renderer
let scene, camera, renderer;

// Initialize Three.js components and load glTF model
function init() {
  // Get the container element from the HTML file
  const container = document.getElementById("scene-container");

  // Create a scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // Create a WebGL renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Add the renderer to the container element
  container.appendChild(renderer.domElement);

  // Load the glTF model using GLTFLoader
  const loader = new THREE.GLTFLoader();
  loader.load(
    'path/to/your-model.glb', // Replace with the path to your glTF model
    (gltf) => {
      // The model is loaded, and the 'gltf' object contains the 3D model data

      // Access the root of the model to position and add it to the scene
      const model = gltf.scene;
      model.position.set(0, 0, 0); // Set the initial position
      scene.add(model);

      // You can apply any other transformations or animations to the model here
    },
    undefined,
    (error) => {
      console.error('Error loading glTF model:', error);
    }
  );

  // Start rendering the scene
  animate();
}

// Create an animation loop
function animate() {
  requestAnimationFrame(animate);

  // Perform any animation updates here, if needed

  // Render the scene
  renderer.render(scene, camera);
}

// Call the init function when the window finishes loading
window.addEventListener('load', init);


// Function to handle the mouse wheel event
function handleMouseWheel(event) {
    // Get the delta (scroll direction) from the event
    const delta = Math.sign(event.deltaY);
  
    // Perform actions based on the scroll direction (delta)
    if (delta > 0) {
      // User scrolled down
      // Trigger animations for the next model appearance here
      // For example: animateNextModel();
    } else if (delta < 0) {
      // User scrolled up
      // Trigger animations for the previous model appearance here
      // For example: animatePreviousModel();
    }
  }
  
  // Function to add the event listener to the container element
  function addMouseWheelListener() {
    const container = document.getElementById("scene-container");
  
    // Add the event listener to detect mouse wheel events
    container.addEventListener("wheel", handleMouseWheel);
  }
  
  // Call the function to add the event listener when the window finishes loading
  window.addEventListener("load", addMouseWheelListener);
  

// Global variable to keep track of the current model
let currentModel;

// Function to handle the mouse wheel event
function handleMouseWheel(event) {
  // Prevent the default scroll behavior
  event.preventDefault();

  // Get the delta (scroll direction) from the event
  const delta = event.deltaY;

  // Perform actions based on the scroll direction (delta)
  if (delta > 0) {
    // User scrolled down
    // Implement disappear animation for the current model
    if (currentModel) {
      // Use GSAP to animate the current model's position and opacity
      gsap.to(currentModel.position, { duration: 1, y: -2, opacity: 0, onComplete: removeCurrentModel });
    }

    // Trigger animations for the next model appearance here
    // For example: animateNextModel();
  } else if (delta < 0) {
    // User scrolled up
    // Implement disappear animation for the current model
    if (currentModel) {
      // Use GSAP to animate the current model's position and opacity
      gsap.to(currentModel.position, { duration: 1, y: 2, opacity: 0, onComplete: removeCurrentModel });
    }

    // Trigger animations for the previous model appearance here
    // For example: animatePreviousModel();
  }
}

// Function to remove the current model from the scene
function removeCurrentModel() {
  if (currentModel) {
    scene.remove(currentModel);
    currentModel = null;
  }
}

// Function to add the event listener to the container element
function addMouseWheelListener() {
  const container = document.getElementById("scene-container");

  // Add the event listener to detect mouse wheel events
  container.addEventListener("wheel", handleMouseWheel);
}

// Call the function to add the event listener when the window finishes loading
window.addEventListener("load", addMouseWheelListener);


// Function to handle the mouse wheel event
function handleMouseWheel(event) {
    // Prevent the default scroll behavior
    event.preventDefault();
  
    // Get the delta (scroll direction) from the event
    const delta = event.deltaY;
  
    // Perform actions based on the scroll direction (delta)
    if (delta > 0) {
      // User scrolled down
      // Implement disappear animation for the current model
      if (currentModel) {
        // Use GSAP to animate the current model's position and opacity
        gsap.to(currentModel.position, { duration: 1, y: -2, opacity: 0, onComplete: removeCurrentModel });
      }
  
      // Trigger animations for the next model appearance here
      animateNextModel();
    } else if (delta < 0) {
      // User scrolled up
      // Implement disappear animation for the current model
      if (currentModel) {
        // Use GSAP to animate the current model's position and opacity
        gsap.to(currentModel.position, { duration: 1, y: 2, opacity: 0, onComplete: removeCurrentModel });
      }
  
      // Trigger animations for the previous model appearance here
      animatePreviousModel();
    }
  }
  
  // Function to handle the appearance animation of the next glTF model
  function animateNextModel() {
    // Load the new glTF model using GLTFLoader
    const loader = new THREE.GLTFLoader();
    loader.load(
      'path/to/your-next-model.glb', // Replace with the path to your next glTF model
      (gltf) => {
        // The model is loaded, and the 'gltf' object contains the 3D model data
  
        // Access the root of the model to add it to the scene
        const newModel = gltf.scene;
        newModel.position.set(0, 2, 0); // Set the initial position above the scene
        newModel.scale.set(0.1, 0.1, 0.1); // Optional: Scale the model if needed
        newModel.rotation.set(0, 0, 0); // Optional: Set initial rotation
        scene.add(newModel);
  
        // Use GSAP to animate the appearance properties of the new model
        gsap.from(newModel.position, { duration: 1, y: 5, ease: "back.out(1.7)" }); // Animate position
        gsap.from(newModel.scale, { duration: 1, x: 0.01, y: 0.01, z: 0.01, ease: "elastic.out(1, 0.7)" }); // Animate scale
        gsap.from(newModel.rotation, { duration: 1, y: Math.PI, ease: "power2.out" }); // Animate rotation
  
        // Store the new model as the current model
        currentModel = newModel;
      },
      undefined,
      (error) => {
        console.error('Error loading glTF model:', error);
      }
    );
  }
  
  

// Function to remove the current model from the scene
function removeCurrentModel() {
    if (currentModel) {
      // Remove the current model from the scene
      scene.remove(currentModel);
      currentModel = null;
    }
  }
  
  // Function to handle the appearance animation of the next glTF model
  function animateNextModel() {
    // Load the new glTF model using GLTFLoader
    const loader = new THREE.GLTFLoader();
    loader.load(
      'path/to/your-next-model.glb', // Replace with the path to your next glTF model
      (gltf) => {
        // The model is loaded, and the 'gltf' object contains the 3D model data
  
        // Access the root of the model to add it to the scene
        const newModel = gltf.scene;
        newModel.position.set(0, 2, 0); // Set the initial position above the scene
        newModel.scale.set(0.1, 0.1, 0.1); // Optional: Scale the model if needed
        newModel.rotation.set(0, 0, 0); // Optional: Set initial rotation
  
        // Use GSAP to animate the appearance properties of the new model
        gsap.from(newModel.position, { duration: 1, y: 5, ease: "back.out(1.7)" }); // Animate position
        gsap.from(newModel.scale, { duration: 1, x: 0.01, y: 0.01, z: 0.01, ease: "elastic.out(1, 0.7)" }); // Animate scale
        gsap.from(newModel.rotation, { duration: 1, y: Math.PI, ease: "power2.out" }); // Animate rotation
  
        // Store the new model as the current model
        currentModel = newModel;
  
        // Add the new model to the scene
        scene.add(newModel);
      },
      undefined,
      (error) => {
        console.error('Error loading glTF model:', error);
      }
    );
  }
  
  
  // your-custom-script.js

// ... (Previous code)

// Variable to track animation state
let isAnimating = false;

// Function to handle the mouse wheel event
function handleMouseWheel(event) {
  // Prevent the default scroll behavior
  event.preventDefault();

  // Check if animation is already in progress, if so, exit the function
  if (isAnimating) return;

  // Set animation state to true to prevent concurrent animations
  isAnimating = true;

  // Get the delta (scroll direction) from the event
  const delta = event.deltaY;

  // Perform actions based on the scroll direction (delta)
  if (delta > 0) {
    // User scrolled down
    // Implement disappear animation for the current model
    if (currentModel) {
      // Use GSAP to animate the current model's position and opacity
      gsap.to(currentModel.position, {
        duration: 1,
        y: -2,
        opacity: 0,
        onComplete: () => {
          removeCurrentModel();
          isAnimating = false; // Reset animation state
        },
      });
    }

    // Trigger animations for the next model appearance here
    animateNextModel();
  } else if (delta < 0) {
    // User scrolled up
    // Implement disappear animation for the current model
    if (currentModel) {
      // Use GSAP to animate the current model's position and opacity
      gsap.to(currentModel.position, {
        duration: 1,
        y: 2,
        opacity: 0,
        onComplete: () => {
          removeCurrentModel();
          isAnimating = false; // Reset animation state
        },
      });
    }

    // Trigger animations for the previous model appearance here
    animatePreviousModel();
  }
}

// Function to handle the appearance animation of the next glTF model
function animateNextModel() {
  // ... (Previous code)

  // Add the new model to the scene
  scene.add(newModel);

  isAnimating = false; // Reset animation state after the new model is added
}

// Function to add the event listener to the container element
function addMouseWheelListener() {
  const container = document.getElementById("scene-container");

  // Add the event listener to detect mouse wheel events
  container.addEventListener("wheel", handleMouseWheel);
}

// Call the function to add the event listener when the window finishes loading
window.addEventListener("load", addMouseWheelListener);

// ... (Remaining code)

  
  