document.addEventListener('DOMContentLoaded', () => {
    const cubeContainer = document.querySelector('.cube-container');
    const addCubeButton = document.getElementById('addCubeButton');
    const removeCubeButton = document.getElementById('removeCubeButton');

    let isRotating = false;
    let mouseX = 0;
    let mouseY = 0;
    const cubes = [];

    function rotateCube(cube) {
        cube.style.transform = `rotateX(${-mouseY}deg) rotateY(${mouseX}deg)`;
        if (isRotating) {
            requestAnimationFrame(() => rotateCube(cube));
        }
    }

    function updateMousePosition(event) {
        mouseX = (event.clientX / window.innerWidth) * 360 - 180;
        mouseY = (event.clientY / window.innerHeight) * 360 - 180;
    }

    function toggleRotation(cube) {
        isRotating = !isRotating;
        if (isRotating) {
            document.addEventListener('mousemove', updateMousePosition);
            requestAnimationFrame(() => rotateCube(cube));
        } else {
            document.removeEventListener('mousemove', updateMousePosition);
        }
    }

    function addCube() {
        const newCube = document.createElement('div');
        newCube.classList.add('cube');
        
        const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
        faces.forEach(face => {
            const faceDiv = document.createElement('div');
            faceDiv.classList.add('face', face);
            newCube.appendChild(faceDiv);
        });

        newCube.addEventListener('click', () => toggleRotation(newCube));
        cubeContainer.appendChild(newCube);
        cubes.push(newCube); // เพิ่มลูกบาศก์ลงในอาร์เรย์
        newCube.style.opacity = 0; // เริ่มต้นที่โปร่งใส
        setTimeout(() => newCube.style.opacity = 1, 10); // เพิ่มอนิเมชัน
    }

    function removeCube() {
        const lastCube = cubes.pop();
        if (lastCube) {
            lastCube.style.opacity = 0; // ทำให้โปร่งใสก่อนลบ
            setTimeout(() => cubeContainer.removeChild(lastCube), 300); // รออนิเมชันจบก่อนลบ
        }
    }

    addCubeButton.addEventListener('click', addCube);
    removeCubeButton.addEventListener('click', removeCube);
});
