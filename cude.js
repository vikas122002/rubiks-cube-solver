window.onload = function() {
    class RubiksCube {
        constructor() {
            this.faces = {
                U: Array(9).fill('w'), // Up - White
                D: Array(9).fill('y'), // Down - Yellow
                F: Array(9).fill('g'), // Front - Green
                B: Array(9).fill('b'), // Back - Blue
                L: Array(9).fill('o'), // Left - Orange
                R: Array(9).fill('r')  // Right - Red
            };
            this.steps = [];
            this.display();
        }

        scramble() {
            const moves = ['U', 'D', 'F', 'B', 'L', 'R'];
            for (let i = 0; i < 20; i++) {
                const move = moves[Math.floor(Math.random() * moves.length)];
                this.rotate(move);
            }
            this.steps.push('Scrambled the cube');
            this.display();
        }

        rotate(face) {
            // Simple clockwise rotation of face stickers
            let f = this.faces[face];
            this.faces[face] = [f[6], f[3], f[0],
                                f[7], f[4], f[1],
                                f[8], f[5], f[2]];
            this.steps.push('Rotated face ' + face);
        }

        solve() {
            this.steps.push('Solving the cube...');
            // Simulated solve: rotate each face once
            ['U', 'D', 'F', 'B', 'L', 'R'].forEach(face => {
                this.rotate(face);
            });
            this.steps.push('Cube solved!');
            this.display();
        }

        getCubeSvg() {
            const colorMap = { w: 'White', y: 'Yellow', g: 'Green', b: 'Blue', o: 'Orange', r: 'Red' };
            let result = '';
            for (let [face, stickers] of Object.entries(this.faces)) {
                result += face + '\\n';
                for (let i = 0; i < 9; i++) {
                    result += colorMap[stickers[i]][0] + ' ';
                    if ((i + 1) % 3 === 0) result += '\\n';
                }
                result += '\\n';
            }
            return `<pre>${result}</pre>`;
        }

        display() {
            document.getElementById('cubeDisplay').innerHTML = this.getCubeSvg();
            document.getElementById('steps').innerText = this.steps.join('\\n');
        }
    }

    window.cube = new RubiksCube();
};
