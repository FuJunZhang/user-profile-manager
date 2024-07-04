package useridmapping;

import org.apache.commons.codec.digest.MurmurHash3;

/**
 * @author zfj
 * @create 2024-03-27 15:06
 */
public class Murmur3Demo {
    public static void main(String[] args) {
        // Create a byte array to hash
        byte[] data = "abc13uNRtu".getBytes();

        // Compute a 32-bit hash value
        int hash32 = MurmurHash3.hash32x86(data);
        System.out.println("32-bit hash: " + hash32);

        // Compute a 64-bit hash value
        long hash64 = MurmurHash3.hash64(data);
        System.out.println("64-bit hash: " + hash64);

        // Compute a 128-bit hash value as two long values
        long[] hash128x64 = MurmurHash3.hash128x64(data);
        System.out.println("128-bit hash: " + hash128x64[0] + ", " + hash128x64[1]);
    }
}