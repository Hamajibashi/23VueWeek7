<template>
    <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span>刪除產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    確定要刪除
                    <strong class="text-danger">{{item.title}}</strong>？(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-danger"  @click="$emit('del-item')">
                        確認刪除
                    </button>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  props: {
    item: {}
  },
  emits: ['del-item']
}
</script>
