<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>數學題目生成器</title>
    <link rel="stylesheet" href="popup.css">
    <script src="popup.js" defer></script>
    <style>
        /* ... 保持原有的 style ... */
    </style>
</head>
<body>
    <h1>基本算式題型</h1>
    <div class="button-grid">
        <?php
        // 基本算式題型按鈕配置
        $basicButtons = [
            'twoDigitAdd' => '2位數加法',
            'threeDigitAdd' => '3位數加法',
            'fourDigitAdd' => '4位數加法',
            'twoDigitSubtract' => '2位數減法',
            'threeDigitSubtract' => '3位數減法',
            'fourDigitSubtract' => '4位數減法',
            'nineByNineMultiply' => '9x9乘法練習',
            'twoDigitMultiply' => '2x1位數乘法',
            'twoDigitMultiply2' => '2x2位數乘法',
            'threeDigitMultiply' => '3x1位數乘法',
            'distributiveLaw' => '乘法分配律',
            'twoDigitDivide' => '2位數除法',
            'threeDigitDivide' => '3位數除法'
        ];

        foreach ($basicButtons as $id => $text) {
            echo "<button id='$id'>$text</button>";
        }
        ?>
    </div>

    <h1>進階項目</h1>
    <button onclick="window.open('https://www.liveism.com/live-concept.php?q=4%E7%9A%84%E5%80%8D%E6%95%B8%E5%88%A4%E5%88%A5%E6%B3%95', '_blank')" 
            style="background-color: #808080; color: #ffffff; font-size: 20px; padding: 10px 20px; border: none; 
                   border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; 
                   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); margin: 10px auto; display: block;">
        公因倍數判別
    </button>

    <div class="button-grid">
        <?php
        // 進階項目按鈕配置
        $advancedButtons = [
            'gcd' => '最大公因數',
            'lcm' => '最大公倍數',
            'multipleOfThree' => '3的倍數判別',
            'multipleOfFour' => '4的倍數判別',
            'multipleOfSix' => '6的倍數判別',
            'multipleOfNine' => '9的倍數判別',
            'multipleOfEleven' => '11的倍數判別',
            'factorOfThree' => '3的因數判別',
            'factorOfFour' => '4的因數判別',
            'factorOfSix' => '6的因數判別',
            'factorOfSeven' => '7的因數判別',
            'factorOfEight' => '8的因數判別',
            'factorOfNine' => '9的因數判別',
            'factorOfEleven' => '11的因數判別'
        ];

        foreach ($advancedButtons as $id => $text) {
            $class = strpos($id, 'multiple') !== false ? 'multiple-button' : 'factor-button';
            echo "<button id='$id' class='$class'>$text</button>";
        }
        ?>
    </div>

    <h1>進階項目二</h1>
    <div class="button-grid">
        <?php
        // 進階項目二按鈕配置
        $advancedButtons2 = [
            'fractionOperations' => '分數的四則運算',
            'positiveNegativeAdd' => '正負數加法',
            'positiveNegativeSubtract' => '正負數減法',
            'positiveNegativeMultiplyDivide' => '正負數乘除',
            'fourTermsOperations' => '四項正負數四則運算',
            'threeTermsAdd' => '三項正負數加法',
            'threeTermsSubtract' => '三項正負數減法',
            'linearEquation' => '一元一次方程式',
            'twoVariableEquation' => '二元一次方程式',
            'decimalOperations' => '小數點四則運算',
            'exponentialOperations' => '指數四則運算',
            'sameBaseExponential' => '同底數指數運算',
            'pointDistance' => '兩點間距離',
            'findPoint' => '已知一點求另一點',
            'exponentialDistribution' => '指數分配律',
            'standardForm' => '標準分解式',
            'perfectSquare' => '完全平方數練習'
        ];

        foreach ($advancedButtons2 as $id => $text) {
            $class = $id === 'fractionOperations' || $id === 'decimalOperations' ? 'factor-button' : '';
            echo "<button id='$id'" . ($class ? " class='$class'" : "") . ">$text</button>";
        }
        ?>
    </div>
</body>
</html> 