document.querySelectorAll('button').forEach(button => {
    // 排除公因倍數判別按鈕
    if (!button.hasAttribute('onclick')) {
        button.addEventListener('click', function() {
            // 根據按鈕的ID生成題目
            generateQuestions(this.id);
        });
    }
});

function generateQuestions(selectedType) {
    let questions = [];

    for (let i = 0; i < 15; i++) {
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
            
                    // 格式化數字，移除不必要的0
                    const formatNumber = (num) => {
                        return Number(num.toFixed(2)).toString();
                    };
            
                    questions.push({
                        question: `${i + 1}. ${a1}x + ${b1}y = ${c1} <br><br> &nbsp &nbsp ${a2}x + ${b2}y = ${c2}`,
                        answer: `${formatNumber(x)},${formatNumber(y)}` // 使用新的格式化函數
                    });
                } else {
                    // 如果行列式為零，則重新生成題目
                    i--; // 重新生成這一題
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
                num1 = Math.floor(Math.random() * 90) + 10; // 生成2位
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
                num2 = Math.floor(Math.random() * 9) + 1; // 生成1位數
                questions.push({ 
                    question: `${i + 1}. ${num1} × ${num2} = `, // 使用正確的乘號符號
                    answer: num1 * num2 
                });
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
            case 'twoDigitDivide': //2位數除法
                do {
                    num1 = Math.floor(Math.random() * 90) + 10; // 生成2位數被除數
                    num2 = Math.floor(Math.random() * 8) + 2; // 生成2-9的除數（避免1）
                    // 確保能整除
                    if (num1 % num2 === 0) {
                        questions.push({ 
                            question: `${i + 1}. ${num1} ÷ ${num2} = `, 
                            answer: num1 / num2 
                        });
                        break;
                    }
                } while (true);
                break;
            case 'threeDigitDivide': //3位數除法
                do {
                    num1 = Math.floor(Math.random() * 900) + 100; // 生成3位數被除數
                    num2 = Math.floor(Math.random() * 8) + 2; // 生成2-9的除數（避免1）
                    // 確保能整除
                    if (num1 % num2 === 0) {
                        questions.push({ 
                            question: `${i + 1}. ${num1} ÷ ${num2} = `, 
                            answer: num1 / num2 
                        });
                        break;
                    }
                } while (true);
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
                    answer: (num1 % 3 === 0) ? "y" : "n"
                });
                break;
            case 'multipleOfFour': // 4的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 4 的倍數嗎？`,
                    answer: (num1 % 4 === 0) ? "y" : "n"
                });
                break;
            case 'multipleOfSix': // 6的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 6 的倍數嗎？`,
                    answer: (num1 % 6 === 0) ? "y" : "n"
                });
                break;
            case 'multipleOfNine': // 9的倍數判別
                num1 = Math.floor(Math.random() * 9999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 9 的倍數嗎？`,
                    answer: (num1 % 9 === 0) ? "y" : "n"
                });
                break;
            case 'multipleOfEleven': // 11的倍數判別
                num1 = Math.floor(Math.random() * 9999999); // 生成0到99的數字
                questions.push({
                    question: `${i + 1}. ${num1} 是 11 的倍數嗎？`,
                    answer: (num1 % 11 === 0) ? "y" : "n"
                });
                break;
            case 'factorOfThree': // 3因數判別
                num2 = Math.floor(Math.random() * (9999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 3; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "y" : "n"
                });
                break;
            case 'factorOfFour': // 4的因數判別
                num2 = Math.floor(Math.random() * (9999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 4; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "y" : "n"
                });
                break;
            case 'factorOfSix': // 6的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 6; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "y" : "n"
                });
                break;
            case 'factorOfSeven': // 7的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 7; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "y" : "n"
                });
                break;
            case 'factorOfEight': // 8的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 8; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "y" : "n"
                });
                break;
            case 'factorOfNine': // 9的因數判別
                num2 = Math.floor(Math.random() * (99999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 9; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "y" : "n"
                });
                break;
            case 'factorOfEleven': // 11的因數判別
                num2 = Math.floor(Math.random() * (9999999 - 10 + 1)) + 10; // 生成2位數到9位數的倍數
                num1 = 11; // 因數
                questions.push({
                    question: `${i + 1}. ${num1} 是 ${num2} 的因數嗎？`,
                    answer: (num2 % num1 === 0) ? "y" : "n"
                });
                break;
            case 'positiveNegativeAdd': // 正負數加法
                num1 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                num2 = Math.floor(Math.random() * 50) - 10; // 生成-10到9的數字
                // 將負數加上號
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
                // 隨機成分子和分母
                let numerator1 = Math.floor(Math.random() * 10) + 1; // 生成1到10的分子
                let denominator1 = Math.floor(Math.random() * 10) + 1; // 生成1到10的分母
                let numerator2 = Math.floor(Math.random() * 10) + 1; // 生成1到10的分子
                let denominator2 = Math.floor(Math.random() * 10) + 1; // 生成1到10的分母
                // 隨機選擇運算符
                let fractionOperation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
                let question, answer;
                switch (fractionOperation) {
                    case '+':
                        question = `${formatFraction(numerator1, denominator1)} + ${formatFraction(numerator2, denominator2)}`;
                        answer = `${(numerator1 * denominator2 + numerator2 * denominator1)}/${(denominator1 * denominator2)}`;
                        break;
                    case '-':
                        question = `${formatFraction(numerator1, denominator1)} - ${formatFraction(numerator2, denominator2)}`;
                        answer = `${(numerator1 * denominator2 - numerator2 * denominator1)}/${(denominator1 * denominator2)}`;
                        break;
                    case '*':
                        question = `${formatFraction(numerator1, denominator1)} × ${formatFraction(numerator2, denominator2)}`;
                        answer = `${(numerator1 * numerator2)}/${(denominator1 * denominator2)}`;
                        break;
                    case '/':
                        question = `${formatFraction(numerator1, denominator1)} ÷ ${formatFraction(numerator2, denominator2)}`;
                        answer = `${(numerator1 * denominator2)}/${(denominator1 * numerator2)}`;
                        break;
                }
            
                questions.push({
                    question: `${i + 1}. ${question} = `,
                    answer: simplifyFraction(answer)
                });
                break;
            case 'decimalOperations': // 小數點四則運算
                let decimalNum1 = (Math.random() * 10).toFixed(1); // 生成0到100的隨機小數，保留一位小數
                let decimalNum2 = (Math.random() * 10).toFixed(1); // 生成0到100的隨機小數，保留一位小數
                const decimalOperations = ['+', '-', '*', '/'];
                const decimalOperation = decimalOperations[Math.floor(Math.random() * decimalOperations.length)];
                
                let decimalQuestion, decimalAnswer;
                
                switch (decimalOperation) {
                    case '+':
                        decimalQuestion = `${decimalNum1} + ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) + parseFloat(decimalNum2)).toFixed(1);
                        break;
                    case '-':
                        decimalQuestion = `${decimalNum1} - ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) - parseFloat(decimalNum2)).toFixed(1);
                        break;
                    case '*':
                        decimalQuestion = `${decimalNum1} × ${decimalNum2}`;
                        decimalAnswer = (parseFloat(decimalNum1) * parseFloat(decimalNum2)).toFixed(1);
                        break;
                    case '/':
                        decimalQuestion = `${decimalNum1} ÷ ${decimalNum2}`;
                        // Ensure division by zero does not occur and the answer is rounded to one decimal place
                        if (parseFloat(decimalNum2) === 0) {
                            decimalNum2 = (Math.random() * 10).toFixed(1); // Generate a new decimalNum2 to avoid division by zero
                        }
                        // Ensure division results in a whole number or a decimal with one place
                        if (parseFloat(decimalNum1) % parseFloat(decimalNum2) === 0) {
                            decimalAnswer = (parseFloat(decimalNum1) / parseFloat(decimalNum2)).toFixed(0);
                        } else {
                            decimalAnswer = (parseFloat(decimalNum1) / parseFloat(decimalNum2)).toFixed(1);
                        }
                        break;
                }
                
                // Ensure the answer is positive
                if (decimalAnswer < 0) {
                    decimalAnswer = Math.abs(decimalAnswer).toFixed(1);
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
                        // 保不會除以零，並且答案可以整除
                        let divisor;
                        do {
                            divisor = Math.floor(Math.random() * 100) - 50; // 生成-50到49的數字
                        } while (divisor === 0 || num16 % divisor !== 0); // 確除數不為0且答案可以整除
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
            case 'fourTermsOperations': // 四項正負數四則運算
                let nums, operators, formattedNums, finalResult;
                do {
                    // 生成4個-50到49的隨機數
                    nums = Array(4).fill().map(() => Math.floor(Math.random() * 100) - 50);
                    // 生成3個運算符（+、-、×、÷中隨機選擇）
                    operators = Array(3).fill().map(() => ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)]);
                    
                    // 格式化數字（負數加號）
                    formattedNums = nums.map(n => n < 0 ? `(${n})` : n);
                    
                    // 如果有除法運算，確保能整除
                    for(let i = 0; i < operators.length; i++) {
                        if(operators[i] === '÷') {
                            // 確保除數不為0且能整除
                            while(nums[i+1] === 0 || nums[i] % nums[i+1] !== 0) {
                                nums[i+1] = Math.floor(Math.random() * 20) - 10; // 生成較小的數以加整除概率
                                formattedNums[i+1] = nums[i+1] < 0 ? `(${nums[i+1]})` : nums[i+1];
                            }
                        }
                    }
                    
                    // 預計算結果（考慮運算優先級）
                    let tempNums = [...nums];
                    let tempOps = [...operators];
                    
                    // 先處理乘
                    for(let i = 0; i < tempOps.length; i++) {
                        if(tempOps[i] === '×' || tempOps[i] === '÷') {
                            let tempResult;
                            if(tempOps[i] === '×') {
                                tempResult = tempNums[i] * tempNums[i + 1];
                            } else {
                                tempResult = tempNums[i] / tempNums[i + 1];
                            }
                            tempNums.splice(i, 2, tempResult);
                            tempOps.splice(i, 1);
                            i--;
                        }
                    }
                    
                    // 再處理加減
                    finalResult = tempNums[0];
                    for(let i = 0; i < tempOps.length; i++) {
                        if(tempOps[i] === '+') finalResult += tempNums[i + 1];
                        if(tempOps[i] === '-') finalResult -= tempNums[i + 1];
                    }
                    
                    // 檢查結果是否在範圍內
                } while (Math.abs(finalResult) > 999);
                
                // 構建問題字符串
                let fourTermsQuestion = `${formattedNums[0]} ${operators[0]} ${formattedNums[1]} ${operators[1]} ${formattedNums[2]} ${operators[2]} ${formattedNums[3]}`;
                
                questions.push({
                    question: `${i + 1}. ${fourTermsQuestion} = `,
                    answer: finalResult
                });
                break;
            case 'sameBaseExponential': // 同底數指數四則運算
                let sameBase, sameExpNums, samePoweredNums, sameExpOp;
                do {
                    // 生成一個底數（2-9）和兩個指數（2-9）
                    sameBase = Math.floor(Math.random() * 8) + 2; // 2-9的底數
                    sameExpNums = Array(2).fill().map(() => Math.floor(Math.random() * 8) + 2); // 2-9的指數
                    sameExpOp = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)]; // 隨機選擇一個運算符
                    
                    // 計算每個數字的指數值
                    samePoweredNums = sameExpNums.map(exp => Math.pow(sameBase, exp));
                    
                    // 預計算結果
                    let sameResult;
                    switch(sameExpOp) {
                        case '+': sameResult = samePoweredNums[0] + samePoweredNums[1]; break;
                        case '-': sameResult = Math.max(samePoweredNums[0], samePoweredNums[1]) - 
                                             Math.min(samePoweredNums[0], samePoweredNums[1]); break;
                        case '×': sameResult = samePoweredNums[0] * samePoweredNums[1]; break;
                        case '÷': sameResult = samePoweredNums[0] / samePoweredNums[1]; break;
                    }
                    
                    // 如果結果超過999或任何一個數超過999，重生成
                } while (samePoweredNums[0] > 999 || samePoweredNums[1] > 999 || 
                        (sameExpOp === '×' && samePoweredNums[0] * samePoweredNums[1] > 999) ||
                        (sameExpOp === '+' && samePoweredNums[0] + samePoweredNums[1] > 999));
                
                // 如果是除運算，確保能整除且除數不為0
                if(sameExpOp === '÷') {
                    let dividend = samePoweredNums[0];
                    let divisor = samePoweredNums[1];
                    
                    // 如果不能整除，重新生成第二個指數直能整除
                    while(divisor === 0 || dividend % divisor !== 0 || dividend / divisor > 999) {
                        sameExpNums[1] = Math.floor(Math.random() * 8) + 2; // 2-9的指數
                        samePoweredNums[1] = Math.pow(sameBase, sameExpNums[1]);
                        divisor = samePoweredNums[1];
                    }
                }
                
                // 構建問題字符串
                let sameExpQuestion = `${formatPower(sameBase, sameExpNums[0])} ${sameExpOp} ${formatPower(sameBase, sameExpNums[1])}`;
                
                // 計算答案
                let sameExpAnswer;
                switch(sameExpOp) {
                    case '+':
                        sameExpAnswer = samePoweredNums[0] + samePoweredNums[1];
                        break;
                    case '-':
                        // 確保減法結果為正數
                        if(samePoweredNums[0] < samePoweredNums[1]) {
                            [samePoweredNums[0], samePoweredNums[1]] = [samePoweredNums[1], samePoweredNums[0]];
                            [sameExpNums[0], sameExpNums[1]] = [sameExpNums[1], sameExpNums[0]];
                            sameExpQuestion = `${formatPower(sameBase, sameExpNums[0])} ${sameExpOp} ${formatPower(sameBase, sameExpNums[1])}`;
                        }
                        sameExpAnswer = samePoweredNums[0] - samePoweredNums[1];
                        break;
                    case '×':
                        sameExpAnswer = samePoweredNums[0] * samePoweredNums[1];
                        break;
                    case '÷':
                        sameExpAnswer = samePoweredNums[0] / samePoweredNums[1];
                        break;
                }
                
                // 新增一個函數來找到最接近的指數表示
                function findExponentialForm(number) {
                    // 遍歷所有可能的底數（2-9）
                    for(let base = 2; base <= 9; base++) {
                        // 遍歷所有可能的指數（1-9）
                        for(let exp = 1; exp <= 9; exp++) {
                            if(Math.pow(base, exp) === number) {
                                return {
                                    base: base,
                                    exponent: exp
                                };
                            }
                        }
                    }
                    return null; // 如果找不到完全相等的指數形式，返回null
                }
                
                // 修改答案格式
                let sameExpResult = findExponentialForm(sameExpAnswer);
                if(sameExpResult) {
                    // 如果能表示為指數形式，使用指數形式
                    questions.push({
                        question: `${i + 1}. ${sameExpQuestion} = `,
                        answer: formatPower(sameExpResult.base, sameExpResult.exponent)
                    });
                } else {
                    // 如果不能表示為指數形式，使用一般數字
                    questions.push({
                        question: `${i + 1}. ${sameExpQuestion} = `,
                        answer: sameExpAnswer
                    });
                }
                break;
            case 'exponentialOperations': // 指數四則運算
                let bases, expNums, poweredNums, expOperator;
                do {
                    // 生成2個底數（2-9）和指數（2-9）
                    bases = Array(2).fill().map(() => Math.floor(Math.random() * 8) + 2); // 2-9的底數
                    expNums = Array(2).fill().map(() => Math.floor(Math.random() * 8) + 2); // 2-9的指數
                    expOperator = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)]; // 隨機選擇一個運算符
                    
                    // 計算每個數字的指數值
                    poweredNums = bases.map((base, i) => Math.pow(base, expNums[i]));
                    
                    // 預計算結果
                    let tempResult;
                    switch(expOperator) {
                        case '+': tempResult = poweredNums[0] + poweredNums[1]; break;
                        case '-': tempResult = Math.max(poweredNums[0], poweredNums[1]) - 
                                             Math.min(poweredNums[0], poweredNums[1]); break;
                        case '×': tempResult = poweredNums[0] * poweredNums[1]; break;
                        case '÷': tempResult = poweredNums[0] / poweredNums[1]; break;
                    }
                    
                    // 果結果超過999或任何一個數超過999，重新生成
                } while (poweredNums[0] > 999 || poweredNums[1] > 999 || 
                        (expOperator === '×' && poweredNums[0] * poweredNums[1] > 999) ||
                        (expOperator === '+' && poweredNums[0] + poweredNums[1] > 999));
                
                // 如果是除運算，確保能整除除數不為0
                if(expOperator === '÷') {
                    let dividend = poweredNums[0];
                    let divisor = poweredNums[1];
                    
                    // 如果不能整除，重新生成第二個數直到能整除
                    while(divisor === 0 || dividend % divisor !== 0 || dividend / divisor > 999) {
                        bases[1] = Math.floor(Math.random() * 8) + 2; // 2-9的底數
                        expNums[1] = Math.floor(Math.random() * 8) + 2; // 2-9的指數
                        poweredNums[1] = Math.pow(bases[1], expNums[1]);
                        divisor = poweredNums[1];
                    }
                }
                
                // 構建問題字符串
                let expQuestion = `${formatPower(bases[0], expNums[0])} ${expOperator} ${formatPower(bases[1], expNums[1])}`;
                
                // 計算答案
                let expAnswer;
                switch(expOperator) {
                    case '+':
                        expAnswer = poweredNums[0] + poweredNums[1];
                        break;
                    case '-':
                        // 確保減法結果為正數
                        if(poweredNums[0] < poweredNums[1]) {
                            [poweredNums[0], poweredNums[1]] = [poweredNums[1], poweredNums[0]];
                            [bases[0], bases[1]] = [bases[1], bases[0]];
                            [expNums[0], expNums[1]] = [expNums[1], expNums[0]];
                            expQuestion = `${formatPower(bases[0], expNums[0])} ${expOperator} ${formatPower(bases[1], expNums[1])}`;
                        }
                        expAnswer = poweredNums[0] - poweredNums[1];
                        break;
                    case '×':
                        expAnswer = poweredNums[0] * poweredNums[1];
                        break;
                    case '÷':
                        expAnswer = poweredNums[0] / poweredNums[1];
                        break;
                }
                
                // 新增一個函數來找到最接近的指數表示
                function findExponentialForm(number) {
                    // 遍歷所有可的底數（2-9）
                    for(let base = 2; base <= 9; base++) {
                        // 遍歷所有可能的指數（1-9）
                        for(let exp = 1; exp <= 9; exp++) {
                            if(Math.pow(base, exp) === number) {
                                return {
                                    base: base,
                                    exponent: exp
                                };
                            }
                        }
                    }
                    return null; // 如果找不到完全相等的指數形式，返回null
                }
                
                // 修改答案格式
                let expResult = findExponentialForm(expAnswer);
                if(expResult) {
                    // 如果能表示為指數形式，用指數形式
                    questions.push({
                        question: `${i + 1}. ${expQuestion} = `,
                        answer: formatPower(expResult.base, expResult.exponent)
                    });
                } else {
                    // 如果不能表示為指數形式，使用一般數字
                    questions.push({
                        question: `${i + 1}. ${expQuestion} = `,
                        answer: expAnswer
                    });
                }
                break;
            case 'pointDistance': // 兩點間距離算
                let point1, point2;
                do {
                    // 生成兩個-50到50之間的點
                    point1 = Math.floor(Math.random() * 101) - 50;
                    point2 = Math.floor(Math.random() * 101) - 50;
                    
                    // 計算距離（差的絕對值）
                    let distance = Math.abs(point2 - point1);
                    
                    // 確保距離不為0不超過100
                    if (distance > 0 && distance <= 100) {
                        // 格式化顯示（負數加括號）
                        let formattedPoint1 = point1 < 0 ? `(${point1})` : point1;
                        let formattedPoint2 = point2 < 0 ? `(${point2})` : point2;
                        
                        questions.push({
                            question: `${i + 1}. 數線上兩點 ${formattedPoint1} 和 ${formattedPoint2} 之間的距離 = `,
                            answer: distance
                        });
                        break;
                    }
                } while (true);
                break;
            case 'findPoint': // 已知一點和距離求另點
                let givenPoint, distance;
                do {
                    // 生成一個-50到50之間的點
                    givenPoint = Math.floor(Math.random() * 101) - 50;
                    // 生成1到50的距離
                    distance = Math.floor(Math.random() * 50) + 1;
                    
                    // 確保結果點在合理範圍內(-50到50)
                    if (Math.abs(givenPoint) + distance <= 50) {
                        // 格式化顯示（題目中的負數加括號）
                        let formattedPoint = givenPoint < 0 ? `(${givenPoint})` : givenPoint;
                        
                        // 隨機決定是要求左邊的點還是右邊的點
                        let isLeftPoint = Math.random() < 0.5;
                        
                        // 計算答案點
                        let answer = isLeftPoint ? givenPoint - distance : givenPoint + distance;
                        
                        questions.push({
                            question: `${i + 1}. 數線上一點 ${formattedPoint}，與另一點的距離為 ${distance}，求在其${isLeftPoint ? '左' : '右'}側的點。`,
                            answer: answer  // 直接使用答案，不加括號
                        });
                        break;
                    }
                } while (true);
                break;
            case 'exponentialDistribution': // 指數分配律
                let baseNum, exp1, exp2;
                do {
                    // 生成2-9的底數和2-5的指數
                    baseNum = Math.floor(Math.random() * 8) + 2;
                    exp1 = Math.floor(Math.random() * 4) + 2;
                    exp2 = Math.floor(Math.random() * 4) + 2;
                    
                    // 計算結果確保不超過999
                    let result = Math.pow(baseNum, exp1 + exp2);
                } while (Math.pow(baseNum, exp1 + exp2) > 999);
                
                // 隨機選擇是乘法還是除法的分配律
                let isMultiply = Math.random() < 0.5;
                
                if (isMultiply) {
                    questions.push({
                        question: `${i + 1}. ${formatPower(baseNum, exp1)} × ${formatPower(baseNum, exp2)} = `,
                        answer: formatPower(baseNum, exp1 + exp2)
                    });
                } else {
                    questions.push({
                        question: `${i + 1}. ${formatPower(baseNum, exp1 + exp2)} ÷ ${formatPower(baseNum, exp2)} = `,
                        answer: formatPower(baseNum, exp1)
                    });
                }
                break;

            case 'standardForm': // 標準分解式
                let number;
                do {
                    // 成2-999的數字
                    number = Math.floor(Math.random() * 998) + 2;
                    
                    // 檢查是否可以分解為2-9的指數形式
                    let canDecompose = false;
                    for(let base = 2; base <= 9; base++) {
                        for(let exp = 2; exp <= 9; exp++) {
                            if(Math.pow(base, exp) === number) {
                                canDecompose = true;
                                break;
                            }
                        }
                        if(canDecompose) break;
                    }
                    
                    if(canDecompose) {
                        // 找到數字的標準分解式
                        let factors = findPrimeFactors(number);
                        let formattedFactors = formatPrimeFactors(factors);
                        
                        questions.push({
                            question: `${i + 1}. ${number} 的標準分解式 = `,
                            answer: formattedFactors
                        });
                        break;
                    }
                } while (true);
                break;
            case 'perfectSquare': // 完全平方數練習
                let squareNum;
                do {
                    // 生成1-20的數字
                    let base = Math.floor(Math.random() * 20) + 1;
                    squareNum = base * base;
                    
                    // 隨機擇題目類型
                    let questionType = Math.random();
                    
                    if (questionType < 0.33) {
                        // 類型1：判斷是否為完全平方數
                        questions.push({
                            question: `${i + 1}. ${squareNum} 是完全平方數嗎？`,
                            answer: "y"
                        });
                    } else if (questionType < 0.66) {
                        // 類型2求平方根
                        questions.push({
                            question: `${i + 1}. ${squareNum} 的平方根 = `,
                            answer: base
                        });
                    } else {
                        // 類型3：求平方
                        questions.push({
                            question: `${i + 1}. ${base} 的平方 = `,
                            answer: squareNum
                        });
                    }
                    break;
                } while (true);
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
    if (questions.length === 0) {
        alert("沒有生成任題目！");
        return;
    }

    const newTab = window.open();
    newTab.document.write(`
        <html>
        <head>
            <title>題目和答案</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1 { 
                    font-size: 24px; 
                    text-align: center;
                    margin-bottom: 20px;
                }
                .problem-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .problem-row {
                    display: flex;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #ddd;
                    gap: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                
                .problem-row:hover {
                    background-color: #f5f5f5;
                }
                
                /* 分數樣式 */
                .fraction {
                    display: inline-block;
                    vertical-align: middle;
                    text-align: center;
                    margin: 0 5px;
                }
                
                .fraction > span {
                    display: block;
                    padding: 3px;
                    text-align: center;
                }
                
                .fraction span.numerator {
                    border-bottom: 1px solid black;
                }
                
                .fraction span.denominator {
                    border-top: none;
                }

                /* 其他樣式... */
                .input-section {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-left: auto;
                }
                
                .answer-input {
                    padding: 5px 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    width: 80px;
                    height: 25px;
                }
                
                .check-mark {
                    color: #4CAF50;
                    font-size: 20px;
                    visibility: hidden;
                }
                
                .x-mark {
                    color: #f44336;
                    font-size: 20px;
                    visibility: hidden;
                }
                
                .wrong-answer {
                    color: #f44336;
                }
                
                .correct-answer {
                    color: #4CAF50;
                }
                
                .verify-btn {
                    padding: 5px 10px;
                    background-color: #45c77b;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                
                .answer {
                    flex: 1;
                    font-size: 18px;
                    text-align: right;
                    color: #45c77b;
                    font-weight: bold;
                    display: none;
                    padding: 10px;
                }
                
                .button-container {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 20px auto;
                }
                
                .show-all-btn, .check-all-btn, .clear-all-btn {
                    padding: 10px 20px;
                    font-size: 16px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                
                .show-all-btn {
                    background-color: #45c77b;
                    color: #000000;
                }
                
                .check-all-btn {
                    background-color: #ff5722;
                    color: #ffffff;
                }
                
                .clear-all-btn {
                    background-color: #808080;
                    color: #ffeb3b;
                }
                
                .show-all-btn:hover, .check-all-btn:hover, .clear-all-btn:hover {
                    transform: translateY(-2px);
                }
                
                .show-all-btn:active, .check-all-btn:active, .clear-all-btn:active {
                    transform: translateY(1px);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                }
                
                .counter-container {
                    display: flex;
                    justify-content: space-between;
                    margin: 20px auto;
                    max-width: 400px;
                    padding: 10px;
                }
                
                .counter {
                    font-size: 18px;
                    font-weight: bold;
                    padding: 10px 20px;
                    border-radius: 5px;
                }
                
                .wrong-counter {
                    color: #f44336;
                }
                
                .correct-counter {
                    color: #4CAF50;
                }
                
                /* 修改返回按鈕樣式 */
                .back-btn {
                    padding: 10px 20px;
                    background-color: #4a90e2;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    margin-right: 20px; /* 與標題保持間距 */
                }
                
                .back-btn:hover {
                    background-color: #357abd;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                
                .back-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                /* 修改標題樣式，使其與按鈕並排 */
                .header-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px 0;
                    position: relative;
                }

                .back-btn {
                    position: absolute;
                    left: 20px;
                }

                h1 {
                    margin: 0;
                    flex-grow: 1;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header-container">
                <button class="back-btn" onclick="window.close()">關閉分頁</button>
                <h1>題目和答案</h1>
            </div>
            <div class="counter-container">
                <div class="counter wrong-counter">答錯：<span id="wrong-count">0</span></div>
                <div class="counter correct-counter">答對：<span id="correct-count">0</span></div>
            </div>
            <div class="button-container">
                <button class="show-all-btn" onclick="toggleAllAnswers()">顯示答案</button>
                <button class="check-all-btn" onclick="checkAllAnswers()">全部檢查</button>
                <button class="clear-all-btn" onclick="clearAllAnswers()">全部清除</button>
            </div>
            <div class="problem-container">
    `);

    // 生成題目和答案的HTML
    questions.forEach((q, index) => {
        newTab.document.write(`
            <div class="problem-row">
                <div class="question">${q.question}</div>
                <div class="input-section">
                    <span class="check-mark" id="check-${index}">✓</span>
                    <span class="x-mark" id="x-${index}">✗</span>
                    <input type="text" class="answer-input" id="input-${index}" 
                           onkeypress="if(event.key === 'Enter') verifyAnswer(${index})">
                    <button class="verify-btn" onclick="verifyAnswer(${index})">檢查</button>
                </div>
                <div class="answer" id="answer-${index}">答案: ${q.answer}</div>
            </div>
        `);
    });

    // 添加JavaScript函數
    newTab.document.write(`
        <script>
        const correctAnswers = ${JSON.stringify(questions.map(q => q.answer))};
        
        let correctCount = 0;
        let wrongCount = 0;

        function updateCounters() {
            document.getElementById('correct-count').textContent = correctCount;
            document.getElementById('wrong-count').textContent = wrongCount;
        }

        function verifyAnswer(index) {
            const input = document.getElementById('input-' + index);
            const checkMark = document.getElementById('check-' + index);
            const xMark = document.getElementById('x-' + index);
            const answer = document.getElementById('answer-' + index);
            const userAnswer = input.value.trim();
            const correctAnswer = correctAnswers[index];
            
            // 清除之前的樣式
            input.classList.remove('wrong-answer', 'correct-answer');
            checkMark.style.visibility = 'hidden';
            xMark.style.visibility = 'hidden';
            
            // 如果輸入為空，清除所有標記和樣式
            if (!userAnswer) {
                input.classList.remove('wrong-answer', 'correct-answer');
                checkMark.style.visibility = 'hidden';
                xMark.style.visibility = 'hidden';
                answer.style.display = 'none';
                return;
            }
            
            // 顯示答案
            answer.style.display = 'block';
            
            // 處理分數答案
            if (typeof correctAnswer === 'string' && correctAnswer.includes('fraction')) {
                const matches = correctAnswer.match(/<span class="numerator">(-?\\d+)<\\/span>.*?<span class="denominator">(-?\\d+)<\\/span>/);
                if (matches) {
                    const correctNumerator = parseInt(matches[1]);
                    const correctDenominator = parseInt(matches[2]);
                    
                    // 如果分母為1，也接受整數形式的答案
                    if (correctDenominator === 1 && userAnswer === String(correctNumerator)) {
                        checkMark.style.visibility = 'visible';
                        xMark.style.visibility = 'hidden';
                        input.classList.add('correct-answer');
                        return;
                    }
                    
                    // 支援帶負號的分數輸入格式
                    const fractionMatch = userAnswer.match(/^-?\\d+\\/-?\\d+$|^-?\\d+\\/\\d+$/);
                    if (fractionMatch) {
                        const [numerator, denominator] = userAnswer.split('/').map(n => parseInt(n));
                        const userIsNegative = userAnswer.startsWith('-') || userAnswer.includes('/-');
                        const finalNumerator = userIsNegative ? -Math.abs(numerator) : Math.abs(numerator);
                        const isCorrect = (finalNumerator * correctDenominator) === (correctNumerator * denominator);
                        checkMark.style.visibility = isCorrect ? 'visible' : 'hidden';
                        xMark.style.visibility = isCorrect ? 'hidden' : 'visible';
                        input.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
                        return;
                    }
                }
            }
            
            // 處理指數答案
            if (typeof correctAnswer === 'string' && /[²³⁴⁵⁶⁷⁸⁹]/.test(correctAnswer)) {
                const superscripts = {'²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9'};
                let normalizedCorrect = correctAnswer;
                for (const [sup, num] of Object.entries(superscripts)) {
                    normalizedCorrect = normalizedCorrect.replace(new RegExp(sup, 'g'), '^' + num);
                }
                const exponentMatch = userAnswer.match(/^\\d+\\^\\d+$/);
                if (exponentMatch) {
                    const isCorrect = userAnswer === normalizedCorrect;
                    checkMark.style.visibility = isCorrect ? 'visible' : 'hidden';
                    xMark.style.visibility = isCorrect ? 'hidden' : 'visible';
                    input.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
                    return;
                }
            }
            
            // 一般答案的比對
            const isCorrect = userAnswer.toLowerCase() === String(correctAnswer).toLowerCase();
            checkMark.style.visibility = isCorrect ? 'visible' : 'hidden';
            xMark.style.visibility = isCorrect ? 'hidden' : 'visible';
            input.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
            
            if (isCorrect) {
                if (!input.classList.contains('correct-answer')) {
                    correctCount++;
                    if (input.classList.contains('wrong-answer')) {
                        wrongCount--;
                    }
                }
            } else {
                if (!input.classList.contains('wrong-answer')) {
                    wrongCount++;
                    if (input.classList.contains('correct-answer')) {
                        correctCount--;
                    }
                }
            }
            
            updateCounters();
        }

        function toggleAllAnswers() {
            const answers = document.querySelectorAll('.answer');
            const btn = document.querySelector('.show-all-btn');
            const isHidden = answers[0].style.display === 'none' || answers[0].style.display === '';
            
            answers.forEach(answer => {
                answer.style.display = isHidden ? 'block' : 'none';
            });
            
            btn.textContent = isHidden ? '隱藏答案' : '顯示答案';
            btn.style.backgroundColor = isHidden ? '#ff5722' : '#45c77b';
            btn.style.color = isHidden ? '#ffffff' : '#000000';
        }

        function checkAllAnswers() {
            correctCount = 0;
            wrongCount = 0;
            
            const inputs = document.querySelectorAll('.answer-input');
            const answers = document.querySelectorAll('.answer');
            const checkMarks = document.querySelectorAll('.check-mark');
            const xMarks = document.querySelectorAll('.x-mark');
            const btn = document.querySelector('.show-all-btn');
            
            // 檢查所有有輸入的答案
            inputs.forEach((input, index) => {
                if (input.value.trim()) {
                    // 先顯示答案以便比對
                    answers[index].style.display = 'block';
                    
                    // 執行答案檢查
                    verifyAnswer(index);
                    
                    // 統計答對答錯數
                    if (checkMarks[index].style.visibility === 'visible') {
                        correctCount++;
                    } else if (xMarks[index].style.visibility === 'visible') {
                        wrongCount++;
                    }
                }
            });
            
            // 更新計數器顯示
            updateCounters();
            
            // 延遲一秒後隱藏答案
            setTimeout(() => {
                answers.forEach(answer => {
                    answer.style.display = 'none';
                });
                
                btn.textContent = '顯示答案';
                btn.style.backgroundColor = '#45c77b';
                btn.style.color = '#000000';
            }, 1000);
        }

        function clearAllAnswers() {
            const inputs = document.querySelectorAll('.answer-input');
            const checkMarks = document.querySelectorAll('.check-mark');
            const xMarks = document.querySelectorAll('.x-mark');
            const answers = document.querySelectorAll('.answer');
            
            inputs.forEach(input => {
                input.value = '';
                input.classList.remove('wrong-answer', 'correct-answer');
            });
            
            checkMarks.forEach(mark => mark.style.visibility = 'hidden');
            xMarks.forEach(mark => mark.style.visibility = 'hidden');
            answers.forEach(answer => answer.style.display = 'none');
            
            // 重置計數器
            correctCount = 0;
            wrongCount = 0;
            updateCounters();
            
            const btn = document.querySelector('.show-all-btn');
            btn.textContent = '顯示答案';
            btn.style.backgroundColor = '#45c77b';
            btn.style.color = '#000000';
        }
        </script>
    `);

    newTab.document.write('</div></body></html>');
    newTab.document.close();
}

// 在文件末尾添加计算函数
function calculateWithPriority(nums, operators) {
    let numbers = [...nums];
    let ops = [...operators];
    
    // 處理乘除法
    for(let i = 0; i < ops.length; i++) {
        if(ops[i] === '×' || ops[i] === '÷') {
            let result;
            if(ops[i] === '×') {
                result = numbers[i] * numbers[i + 1];
            } else {
                result = numbers[i] / numbers[i + 1];
            }
            numbers.splice(i, 2, result);
            ops.splice(i, 1);
            i--;
        }
    }
    
    // 處理加減法
    let result = numbers[0];
    for(let i = 0; i < ops.length; i++) {
        if(ops[i] === '+') {
            result += numbers[i + 1];
        } else if(ops[i] === '-') {
            result -= numbers[i + 1];
        }
    }
    
    return result;
}

// 在文件末尾添加辅助函数
function formatPower(base, exponent) {
    // 如果指數為1，直接返回底數
    if (exponent === 1) {
        return base.toString();
    }
    
    // 將數字轉換為上標形式
    const superscripts = {
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹'
    };
    return `${base}${superscripts[exponent]}`;
}

// 修改 simplifyFraction 函數
function simplifyFraction(fraction) {
    const [numerator, denominator] = fraction.split('/').map(Number);
    const gcdValue = gcd(Math.abs(numerator), Math.abs(denominator));
    const simplifiedNumerator = numerator / gcdValue;
    const simplifiedDenominator = denominator / gcdValue;
    
    // 如果分母為1，直接返回分子
    if (simplifiedDenominator === 1) {
        return simplifiedNumerator.toString();
    }
    
    return formatFraction(simplifiedNumerator, simplifiedDenominator);
}

// 添加格式化分數函數
function formatFraction(numerator, denominator) {
    return `<div class="fraction"><span class="numerator">${numerator}</span><span class="denominator">${denominator}</span></div>`;
}

// 添加輔助函數
function findPrimeFactors(num) {
    let factors = [];
    let divisor = 2;
    
    while (num > 1) {
        while (num % divisor === 0) {
            factors.push(divisor);
            num = num / divisor;
        }
        divisor++;
    }
    
    return factors;
}

function formatPrimeFactors(factors) {
    // 計算每個質因數的次數
    let counts = {};
    factors.forEach(factor => {
        counts[factor] = (counts[factor] || 0) + 1;
    });
    
    // 格式化輸出
    let result = [];
    Object.keys(counts).sort((a, b) => a - b).forEach(factor => {
        if (counts[factor] === 1) {
            result.push(factor);
        } else {
            result.push(formatPower(factor, counts[factor]));
        }
    });
    
    return result.join(' × ');
}