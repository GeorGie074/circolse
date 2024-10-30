document.addEventListener('DOMContentLoaded', () => {
    const cubeContainer = document.querySelector('.cube-container');
    const addCubeButton = document.getElementById('addCubeButton');

    let isRotating = false;
    let mouseX = 0;
    let mouseY = 0;

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

        newCube.addEventListener('click', (event) => {
            event.stopPropagation(); // ป้องกันการลบเมื่อลูกบาศก์หมุน
            removeCube(newCube);
        });

        newCube.addEventListener('click', () => toggleRotation(newCube));
        cubeContainer.appendChild(newCube);
        newCube.style.opacity = 0;
        setTimeout(() => newCube.style.opacity = 1, 10);
    }

    function removeCube(cube) {
        cube.style.opacity = 0; // ทำให้โปร่งใสก่อนลบ
        cube.addEventListener('transitionend', () => {
            cubeContainer.removeChild(cube); // ลบหลังจากอนิเมชันเสร็จ
        }, { once: true }); // เพิ่ม `{ once: true }` เพื่อให้ฟังก์ชันนี้ทำงานแค่ครั้งเดียว
    }
    

    addCubeButton.addEventListener('click', addCube);
});
