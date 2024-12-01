document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        // 根據按鈕的ID生成題目
        generateQuestions(this.id);
    });
});

function generateQuestions(selectedType) {
    let questions = [];

    for (let i = 0; i < 30; i++) {
        let num1, num2, num3; // 重新定義 num3 變數
            switch (selectedType) {
            case 'linearEquation': // 一元一次方程式
            let num4, num5, num6;
                do {
                    num4 = Math.floor(Math.random() * 20) + 1; // 生成1到20的數字
                    num5 = Math.floor(Math.random() * 20) - 10; // 生成-10到9的數字
                    num6 = Math.floor(Math.random() * 20) + 1; // 生成1到20的數字
                } while ((num6 - num5) % num4 !== 0); // 確保 x 為整數
                questions.push({
                    question: `${i + 1}. ${num4 < 0 ? `(${num4})` : num4}x + ${num5 < 0 ? `(${num5})` : num5} = ${num6}`, // 將負數加上括號
                    answer: (num6 - num5) / num4 // 計算 x 的值
                });
                break;
            case 'quadraticEquation': // 一元二次方程式
            let num7, num8, num9;
                do {
                    num7 = Math.floor(Math.random() * 5) + 1; // 生成1到5的數字
                    num8 = Math.floor(Math.random() * 10) - 5; // 生成-5到4的數字
                    num9 = Math.floor(Math.random() * 10) - 5; // 生成-5到4的數字
                } while (num8 * num8 - 4 * num7 * num9 < 0 || (num8 % (2 * num7) !== 0 && num9 % num7 !== 0)); // 確保有整數解
                questions.push({
                    question: `${i + 1}. ${num7}x² + ${num8}x + ${num9} = 0`,
                    answer: `x = ${(-num8 + Math.sqrt(num8 * num8 - 4 * num7 * num9)) / (2 * num7)}, x = ${(-num8 - Math.sqrt(num8 * num8 - 4 * num7 * num9)) / (2 * num7)}`
                });
                break;
            case 'threeTermsAdd': // 三項正負數加法
            let num10, num11, num12;
                num10 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                num11 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                num12 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                // 將負數加上括號
                questions.push({
                    question: `${i + 1}. ${num10 < 0 ? `(${num10})` : num10} + ${num11 < 0 ? `(${num11})` : num11} + ${num12 < 0 ? `(${num12})` : num12} =`,
                    answer: num10 + num11 + num12
                });
                break;
            case 'threeTermsSubtract': // 三項正負數減法
            let num13, num14, num15;
                num13 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                num14 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                num15 = Math.floor(Math.random() * 50) - 10; // 生成-10到39的數字
                // 將負數加上括號
                questions.push({
                    question: `${i + 1}. ${num13 < 0 ? `(${num13})` : num13} - ${num14 < 0 ? `(${num14})` : num14} - ${num15 < 0 ? `(${num15})` : num15} =`,
                    answer: num13 - num14 - num15
                });
                break;
            case 'twoVariableEquation': // 二元一次方程式
                let a1 = Math.floor(Math.random() * 10) + 1; // 生成1到10的數字
                let b1 = Math.floor(Math.random() * 10) + 1; // 生成1到10的數字
                let c1 = Math.floor(Math.random() * 20) + 1; // 生成1到20的數字
                let a2 = Math.floor(Math.random() * 10) + 1; // 生成1到10的數字
                let b2 = Math.floor(Math.random() * 10) + 1; // 生成1到10的數字
                let c2 = Math.floor(Math.random() * 20) + 1; // 生成1到20的數字
            
                // 使用克拉默法則計算 x 和 y
                const determinant = a1 * b2 - a2 * b1; // 行列式
                const determinantX = c1 * b2 - c2 * b1; // x 的行列式
                const determinantY = a1 * c2 - a2 * c1; // y 的行列式
            
                // 確保行列式不為零，否則無法解出
                if (determinant !== 0) {
                    const x = determinantX / determinant; // 計算 x
                    const y = determinantY / determinant; // 計算 y
            
                    questions.push({
                        question: `${i + 1}. ${a1}x + ${b1}y = ${c1} <br><br> &nbsp &nbsp ${a2}x + ${b2}y = ${c2}`,
                        answer: `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}` // 顯示 x 和 y 的值
                    });
                } else {
                    // 如果行列式為零，則重新生成題目
                    // 這裡可以添加重新生成的邏輯
                }
                break;
            case 'twoDigitAdd': // 2位數加法
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                questions.push({ question: `${i + 1}. ${num1} + ${num2} = `, answer: num1 + num2 });
                break;
            case 'threeDigitAdd': // 3位數加法
                num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                num2 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                questions.push({ question: `${i + 1}. ${num1} + ${num2} = `, answer: num1 + num2 });
                break;
            case 'fourDigitAdd': // 4位數加法
                num1 = Math.floor(Math.random() * 9000) + 1000; // 生成4位數
                num2 = Math.floor(Math.random() * 9000) + 1000; // 生成4位數
                questions.push({ question: `${i + 1}. ${num1} + ${num2} = `, answer: num1 + num2 });
                break;
            case 'twoDigitSubtract': //2位數減法
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * num1); // 確保不會超過num1
                questions.push({ question: `${i + 1}. ${num1} - ${num2} = `, answer: num1 - num2 });
                break;
            case 'threeDigitSubtract': //3位數減法
                num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                num2 = Math.floor(Math.random() * num1) ;
                questions.push({ question: `${i + 1}. ${num1} - ${num2} = `, answer: num1 - num2 });
                break;
            case 'fourDigitSubtract': //4位數減法
                num1 = Math.floor(Math.random() * 9000) + 1000; // 生成4位數
                num2 = Math.floor(Math.random() * num1);
                questions.push({ question: `${i + 1}. ${num1} - ${num2} = `, answer: num1 - num2 });
                break;
            case 'twoDigitMultiply': //2x1位數乘法
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 9) + 1; // 生成1位數
                questions.push({ question: `${i + 1}. ${num1} × ${num2} = `, answer: num1 * num2 });
                break;
            case 'twoDigitMultiply2': //2x2位數乘法
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 90) + 10; // 生成1位數
                questions.push({ question: `${i + 1}. ${num1} × ${num2} = `, answer: num1 * num2 });
                break;
            case 'threeDigitMultiply': //3x1位數乘法
                num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                num2 = Math.floor(Math.random() * 9) + 1; // 生成3位數
                questions.push({ question: `${i + 1}. ${num1} × ${num2} = `, answer: num1 * num2 });
                break;
            case 'nineByNineMultiply': //9x9乘法
                num1 = Math.floor(Math.random() * 9) + 1; // 生成1到9的數字
                num2 = Math.floor(Math.random() * 9) + 1; // 生成1到9的數字
                questions.push({ question: `${i + 1}. ${num1} × ${num2} = `, answer: num1 * num2 }); // 9x9乘法
                break;
            case 'distributiveLaw':
                num1 = Math.floor(Math.random() * 10) + 1; // 生成1位數
                num2 = Math.floor(Math.random() * 10) + 1; // 生成1位數
                num3 = Math.floor(Math.random() * 10) + 1; // 生成1位數
                questions.push({ question: `${i + 1}. ${num1} × (${num2} + ${num3}) = `, answer: num1 * (num2 + num3) });
                break;
            case 'twoDigitDivide':
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 9) + 1; // 生成1位數
                questions.push({ question: `${i + 1}. ${num1} ÷ ${num2} = `, answer: (num1 / num2).toFixed(2) });
                break;
            case 'threeDigitDivide':
                num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數
                num2 = Math.floor(Math.random() * 9) + 1; // 生成1位數
                questions.push({ question: `${i + 1}. ${num1} ÷ ${num2} = `, answer: (num1 / num2).toFixed(2) });
                break;
            case 'gcd': // 最大公因數
                num1 = Math.floor(Math.random() * 10) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 10) + 10; // 生成2位數
                questions.push({ question: `${i + 1}. 最大公因數(${num1}, ${num2}) = `, answer: gcd(num1, num2) });
                break;
            case 'lcm': // 最大公倍數
                num1 = Math.floor(Math.random() * 10) + 10; // 生成2位數
                num2 = Math.floor(Math.random() * 10) + 10; // 生成2位數
                questions.push({ question: `${i + 1}. 最大公倍數(${num1}, ${num2}) = `, answer: lcm(num1, num2) });
                break;
            case 'multipleOfThree': // 3的特殊倍數說明
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 3 的倍數嗎？`,
                    answer: (num1 % 3 === 0) ? "是" : "不是"
                });
                break;
            case 'multipleOfFour': // 4的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 4 的倍數嗎？`,
                    answer: (num1 % 4 === 0) ? "是" : "不是"
                });
                break;
            case 'multipleOfSix': // 6的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 6 的倍數嗎？`,
                    answer: (num1 % 6 === 0) ? "是" : "不是"
                });
                break;
            case 'multipleOfNine': // 9的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 9 的倍數嗎？`,
                    answer: (num1 % 9 === 0) ? "是" : "不是"
                });
                break;
            case 'multipleOfEleven': // 11的倍數判別
                num1 = Math.floor(Math.random() * 9999999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 11 的倍數嗎？`,
                    answer: (num1 % 11 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfThree': // 3的因數判別
                num2 = Math.floor(Math.random() * (9999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 3; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfFour': // 4的因數判別
                num2 = Math.floor(Math.random() * (9999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 4; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfSix': // 6的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 6; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfSeven': // 7的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 7; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfEight': // 8的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 8; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfNine': // 9的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 9; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'factorOfEleven': // 11的因數判別
                num2 = Math.floor(Math.random() * (9999999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 11; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "是" : "不是"
                });
                break;
            case 'positiveNegativeAdd': // 正負數加法
                num1 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                num2 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                // 將負數加上括號
                questions.push({
                    question: `${i + 1}. ${num1 < 0 ? `(${num1})` : num1} + ${num2 < 0 ? `(${num2})` : num2} =`,
                    answer: num1 + num2
                });
                break;
            case 'positiveNegativeSubtract': // 正負數減法
                num1 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                num2 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                // 將負數加上括號
                questions.push({
                    question: `${i + 1}. ${num1 < 0 ? `(${num1})` : num1} - ${num2 < 0 ? `(${num2})` : num2} =`,
                    answer: num1 - num2
                });
                break;
            case 'fractionOperations': // 分數4則運算
                // 隨機生成分數的分子和分母
                let numerator1 = Math.floor(Math.random() * 10) + 1; // 生成1到10的分子
                let denominator1 = Math.floor(Math.random() * 10) + 1; // 生成1到10的分母
                let numerator2 = Math.floor(Math.random() * 10) + 1; // 生成1到10的分子
                let denominator2 = Math.floor(Math.random() * 10) + 1; // 生成1到10的分母
                // 隨機選擇運算符
                let fractionOperation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
                let question, answer;
                switch (fractionOperation) {
                    case '+':
                        // 分數加法
                        question = `${numerator1}/${denominator1} + ${numerator2}/${denominator2}`;
                        answer = `${(numerator1 * denominator2 + numerator2 * denominator1)}/${(denominator1 * denominator2)}`; // 計算結果
                        break;
                    case '-':
                        // 分數減法
                        question = `${numerator1}/${denominator1} - ${numerator2}/${denominator2}`;
                        answer = `${(numerator1 * denominator2 - numerator2 * denominator1)}/${(denominator1 * denominator2)}`; // 計算結果
                        break;
                    case '*':
                        // 分數乘法
                        question = `${numerator1}/${denominator1} * ${numerator2}/${denominator2}`;
                        answer = `${(numerator1 * numerator2)}/${(denominator1 * denominator2)}`; // 計算結果
                        break;
                    case '/':
                        // 分數除法
                        question = `${numerator1}/${denominator1} ÷ ${numerator2}/${denominator2}`;
                        answer = `${(numerator1 * denominator2)}/${(denominator1 * numerator2)}`; // 計算結果
                        break;
                }
            
                questions.push({
                    question: `${i + 1}. ${question} = `,
                    answer: simplifyFraction(answer) // 使用約分函數
                });
                function simplifyFraction(fraction) {
                    const [numerator, denominator] = fraction.split('/').map(Number);
                    const gcdValue = gcd(numerator, denominator); // 使用最大公因數函數
                    return `${numerator / gcdValue}/${denominator / gcdValue}`; // 返回約分後的分數
                }
                break;
            case 'decimalOperations': // 小數點四則運算
                let decimalNum1 = (Math.random() * 10).toFixed(2); // 生成0到100的隨機小數
                let decimalNum2 = (Math.random() * 10).toFixed(2); // 生成0到100的隨機小數
                const decimalOperations = ['+', '-', '*', '/'];
                const decimalOperation = decimalOperations[Math.floor(Math.random() * decimalOperations.length)];
                
                let decimalQuestion, decimalAnswer;
                
                switch (decimalOperation) {
                    case '+':
                        decimalQuestion = `${decimalNum1} + ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) + parseFloat(decimalNum2)).toFixed(2);
                        break;
                    case '-':
                        decimalQuestion = `${decimalNum1} - ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) - parseFloat(decimalNum2)).toFixed(2);
                        break;
                    case '*':
                        decimalQuestion = `${decimalNum1} × ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) * parseFloat(decimalNum2)).toFixed(2);
                        break;
                    case '/':
                        decimalQuestion = `${decimalNum1} ÷ ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) / parseFloat(decimalNum2)).toFixed(2);
                        break;
                }
                
                questions.push({
                    question: `${i + 1}. ${decimalQuestion} = `,
                    answer: decimalAnswer
                });
                break;
                case 'positiveNegativeMultiplyDivide': // 正負數乘除運算
                const multiplyDivideOperations = ['*', '/'];
                const operation = multiplyDivideOperations[Math.floor(Math.random() * multiplyDivideOperations.length)];

                // 隨機生成2位數正負數
                const num16 = Math.floor(Math.random() * 100) - 50; // 生成-50到49的數字
                const num17 = Math.floor(Math.random() * 100) - 50; // 生成-50到49的數字

                let MultiplyDividequestion, MultiplyDivideanswer;

                // 將負數加上括號
                const formattedNum1 = num16 < 0 ? `(${num16})` : num16;
                const formattedNum2 = num17 < 0 ? `(${num17})` : num17;

                switch (operation) {
                    case '*':
                        MultiplyDividequestion = `${formattedNum1} × ${formattedNum2}`;
                        MultiplyDivideanswer = num16 * num17;
                        break;
                    case '/':
                        // 確保不會除以零，並且答案可以整除
                        let divisor;
                        do {
                            divisor = Math.floor(Math.random() * 100) - 50; // 生成-50到49的數字
                        } while (divisor === 0 || num16 % divisor !== 0); // 確保除數不為0且答案可以整除
                        const formattedDivisor = divisor < 0 ? `(${divisor})` : divisor; // 格式化除數
                        MultiplyDividequestion = `${formattedNum1} ÷ ${formattedDivisor}`;
                        MultiplyDivideanswer = num16 / divisor; // 保留整數
                        break;
                }

                questions.push({
                    question: `${i + 1}. ${MultiplyDividequestion} = `,
                    answer: MultiplyDivideanswer
                });
                break;
        }
    }
    displayQuestions(questions);
}

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function displayQuestions(questions) {
    // 確保questions陣列不為空
    if (questions.length === 0) {
        alert("沒有生成任何題目！");
        return;
    }

    // 創建一個新的分頁顯示題目
    const questionTab = window.open();
    questionTab.document.write('<html><head><title>生成的題目</title>');
    questionTab.document.write('<style>');
    questionTab.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
    questionTab.document.write('h1 { font-size: 20px; }');
    questionTab.document.write('.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }');
    questionTab.document.write('.question { font-size: 20px; margin: 20px 0; }');
    questionTab.document.write('</style>');
    questionTab.document.write('</head><body>');
    questionTab.document.write('<div class="grid">');

    questions.forEach(q => {
        questionTab.document.write(`<div class="question">${q.question}</div>`);
    });

    questionTab.document.write('</div>');
    questionTab.document.write('</body></html>');
    questionTab.document.close(); // 關閉文檔以顯示內容

    // 創建一個新的分頁顯示答案
    const answerTab = window.open();
    answerTab.document.write('<html><head><title>答案</title>');
    answerTab.document.write('<style>');
    answerTab.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
    answerTab.document.write('h1 { font-size: 20px; }');
    answerTab.document.write('.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }');
    answerTab.document.write('.answer { font-size: 20px; margin: 20px 0; }');
    answerTab.document.write('</style>');
    answerTab.document.write('</head><body>');
    answerTab.document.write('<h1>答案</h1>');
    answerTab.document.write('<div class="grid">');

    questions.forEach((q, index) => {
        answerTab.document.write(`<div class="answer">${index + 1}. 答案: ${q.answer}</div>`); // 添加題號
    });

    answerTab.document.write('</div>');
    answerTab.document.write('</body></html>');
    answerTab.document.close(); // 關閉文檔以顯示內容
}