// Supabase 客戶端服務
class SupabaseService {
    constructor() {
        this.client = null;
        this.isInitialized = false;
    }

    init() {
        if (typeof supabase === 'undefined') {
            console.error('Supabase SDK not loaded');
            return;
        }

        if (SUPABASE_CONFIG.URL === 'YOUR_SUPABASE_URL' || SUPABASE_CONFIG.ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
            console.warn('Supabase credentials not configured');
            return;
        }

        this.client = supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);
        this.isInitialized = true;
        console.log('Supabase client initialized');
    }

    // 將 Base64 轉換為 File 物件
    base64ToFile(base64, filename) {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    // 上傳圖片
    async uploadImage(base64Image, markerId, index) {
        if (!this.isInitialized) return null;

        try {
            const timestamp = Date.now();
            const filename = `${markerId}_${index}_${timestamp}.jpg`;
            const file = this.base64ToFile(base64Image, filename);

            const { data, error } = await this.client.storage
                .from(SUPABASE_CONFIG.BUCKET_NAME)
                .upload(filename, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            // 獲取公開連結
            const { data: { publicUrl } } = this.client.storage
                .from(SUPABASE_CONFIG.BUCKET_NAME)
                .getPublicUrl(filename);

            return publicUrl;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    }

    // 上傳標註點數據
    async uploadMarker(marker) {
        if (!this.isInitialized) return null;

        try {
            // 處理圖片：如果是 Base64，先上傳到 Storage
            let imageUrls = [];
            if (marker.imageData) {
                const images = Array.isArray(marker.imageData) ? marker.imageData : [marker.imageData];
                
                for (let i = 0; i < images.length; i++) {
                    const img = images[i];
                    if (typeof img === 'string' && img.startsWith('data:image/')) {
                        const url = await this.uploadImage(img, marker.id, i);
                        if (url) imageUrls.push(url);
                    } else {
                        // 如果已經是 URL，直接保留
                        imageUrls.push(img);
                    }
                }
            }

            // 準備要上傳的資料
            const markerData = {
                id: marker.id,
                name: marker.name,
                description: marker.description,
                lat: marker.lat,
                lng: marker.lng,
                group_id: marker.groupId,
                subgroup_id: marker.subgroupId,
                color: marker.color,
                icon: marker.icon,
                image_data: imageUrls, // 儲存 URL 陣列
                route_records: marker.routeRecords,
                updated_at: new Date().toISOString()
            };

            const { data, error } = await this.client
                .from(SUPABASE_CONFIG.TABLE_NAME)
                .upsert(markerData, { onConflict: 'id' })
                .select();

            if (error) throw error;

            console.log('Marker uploaded successfully:', data);
            return data;
        } catch (error) {
            console.error('Marker upload failed:', error);
            throw error;
        }
    }

    // 從 Supabase 獲取所有標註點
    async fetchMarkers() {
        if (!this.isInitialized) return null;

        try {
            const { data, error } = await this.client
                .from(SUPABASE_CONFIG.TABLE_NAME)
                .select('*');

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching markers:', error);
            return null;
        }
    }

    // 批量上傳所有標註點
    async syncAllMarkers(markers) {
        if (!this.isInitialized) return;
        
        console.log(`Starting sync for ${markers.length} markers...`);
        let successCount = 0;
        let failCount = 0;

        for (const marker of markers) {
            try {
                await this.uploadMarker(marker);
                successCount++;
            } catch (error) {
                failCount++;
            }
        }

        return { success: successCount, failed: failCount };
    }

    // 刪除標註點
    async deleteMarker(markerId) {
        if (!this.isInitialized) return null;

        try {
            // 注意：我們暫時不刪除關聯的圖片，因為圖片可能被其他邏輯引用，
            // 或者如果需要刪除圖片，需要先獲取圖片路徑。
            // 為了簡化，這裡只刪除資料庫記錄。

            const { error } = await this.client
                .from(SUPABASE_CONFIG.TABLE_NAME)
                .delete()
                .eq('id', markerId);

            if (error) throw error;

            console.log('Marker deleted successfully:', markerId);
            return true;
        } catch (error) {
            console.error('Marker deletion failed:', error);
            throw error;
        }
    }
}

const supabaseService = new SupabaseService();
