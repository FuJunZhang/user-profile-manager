package useridmapping;

import com.google.common.hash.HashCode;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;

/**
 * @author zfj
 * @create 2024-03-27 15:07
 */
public class GuavaMurmurDemo {
    public static void main(String[] args) {
        // 创建一个128 位的murmur3哈希函数
        HashFunction hashFunction = Hashing.murmur3_128();

        // 计算字符串"Hello world"的哈希值
        HashCode hashCode = hashFunction.hashString("Hello world", StandardCharsets.UTF_8);

        // 打印哈希值  -769998839
        System.out.println(hashCode.asInt());
    }
}
