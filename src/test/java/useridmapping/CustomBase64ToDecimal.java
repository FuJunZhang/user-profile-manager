package useridmapping;

import java.math.BigInteger;

/**
 * @author zfj
 * @create 2024-03-27 10:14
 */
public class CustomBase64ToDecimal {
    // 字符集(长度：64）
    private static final String BASE_64_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-"; // 自定义的64进制字符集

    // 64进制的基数
    private static final int BASE_64 = BASE_64_CHARS.length();


    public static void main(String[] args) {
//        String base64String = "BCDezzz9G1"; // 自定义的64进制字符串
        String base64String = "11111111111111zzzzzhhhhbbbnnn"; // 自定义的64进制字符串
        BigInteger bigInteger = customBase64ToDecimal(base64String); // 转换为十进制
        System.out.println(bigInteger); // 输出十进制结果

        String s = customDecimalToBase64(bigInteger);
        System.out.println(s);


        StringBuilder testBuilder = new StringBuilder();
        testBuilder.insert(0,'c');
        testBuilder.insert(0,'d');
        testBuilder.insert(0,'e');
        System.out.println(testBuilder.toString());


    }

    // 自定义的 base 64 转十进制的算法
    private static BigInteger customBase64ToDecimal(String base64String) {
        BigInteger decimal = BigInteger.ZERO;
        int power = 0;
        for (int i = base64String.length() - 1; i >= 0; i--) {
            char c = base64String.charAt(i);
            int digit = BASE_64_CHARS.indexOf(c);
            decimal = decimal.add(BigInteger.valueOf(digit).multiply(BigInteger.valueOf(BASE_64).pow(power)));
            power++;
        }
        return decimal;
    }


    /**
     * BCD
     * 13*1+12*64+11*64*64=45837
     * 45837/64    商为：716    余数：13
     * 716/64      商为：11     余数：12
     * 11/64       商为：0      余数：11
     * <p>
     * BC
     * 12*1+11*64=716
     * 716/64  商为：11   余数：12
     * 11/64   商为：0     余数：11
     * <p>
     * B
     * 11*1=11
     * 11/64  商为：0  余数：11
     */

    private static String customDecimalToBase64(BigInteger decimal) {
        StringBuilder base64String = new StringBuilder();
        if (decimal.equals(BigInteger.ZERO)) {
            return String.valueOf(BASE_64_CHARS.charAt(0));
        }
        while (decimal.compareTo(BigInteger.ZERO) > 0) {
            BigInteger[] quotientAndRemainder = decimal.divideAndRemainder(BigInteger.valueOf(BASE_64));
            BigInteger remainder = quotientAndRemainder[1];
            base64String.insert(0, BASE_64_CHARS.charAt(remainder.intValue()));
            decimal = quotientAndRemainder[0];
        }
        return base64String.toString();
    }
}