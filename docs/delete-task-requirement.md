# 删除任务功能需求文档

## 1. 功能概述
本功能允许用户删除不再需要的任务，提升任务管理的灵活性和效率。

## 2. 需求分析
### 2.1 功能需求
- 用户可以通过点击任务卡片上的"删除任务"按钮删除特定任务
- 删除操作前需要确认，防止误删
- 删除成功后前端页面自动刷新，更新任务列表
- 提供友好的操作反馈

### 2.2 非功能需求
- 响应式设计，适配不同设备屏幕
- 错误处理机制，网络异常时提示用户
- 性能优化，确保删除操作快速响应

## 3. 技术实现方案
### 3.1 前端实现
1. 在任务列表中为每个任务添加删除按钮
2. 实现删除确认弹窗
3. 调用后端API执行删除操作
4. 更新本地任务列表或重新获取最新数据

### 3.2 后端实现
1. 创建DELETE /api/task/:id接口
2. 验证用户权限（如果需要）
3. 执行数据库删除操作
4. 返回合适的HTTP状态码

## 4. 数据模型
任务表结构：
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  createdAt INTEGER DEFAULT CURRENT_TIMESTAMP,
  updatedAt INTEGER DEFAULT CURRENT_TIMESTAMP
);
```

## 5. API设计
### 5.1 删除任务接口
- **URL**: `/api/task/:id`
- **方法**: DELETE
- **参数**: 
  - id: 任务ID（路径参数）
- **响应**: 
  - 200 OK: 删除成功
  - 404 Not Found: 任务不存在
  - 500 Internal Server Error: 服务器错误

## 6. 界面设计
- 每个任务卡片右侧添加红色删除按钮
- 点击按钮弹出确认对话框
- 操作成功后显示提示信息

## 7. 实现代码
### 7.1 前端代码（app/pages/index.vue）
```vue
<script setup lang="ts">
// 使用$fetch 获取数据
const { data: tasks, error, status, refresh } = await useFetch("/api/task");

/**
 * 删除任务函数
 * @param id 任务 ID
 */
const deleteTask = async (id: number) => {
  // 确认删除
  if (!confirm('确定要删除这个任务吗？')) {
    return;
  }
  
  try {
    await $fetch(`/api/task/${id}`, {
      method: 'DELETE'
    });
    // 刷新任务列表
    await refresh();
    alert('任务删除成功');
  } catch (error) {
    console.error('删除任务失败:', error);
    alert('删除任务失败，请稍后重试');
  }
};
</script>

<template>
    <div class="container">
        <article v-for="task in tasks" key="task.id">
            <h2>{{ task.title }}</h2>
            <p>{{ task.description }}</p>
            <b>
                <button class="btn btn-primary size-10" @click="deleteTask(task.id)">
                    删除任务
                </button>
            </b>
        </article>
    </div>
</template>
```

### 7.2 后端代码（server/api/task.delete.ts）
```typescript
// 导入数据库实例
import db from "~/lib/db/index";
// 导入任务表 schema
import { tasks } from "~/lib/db/schema";
// 导入 eq 操作符
import { eq } from "drizzle-orm";

/**
 * 删除任务 API 接口
 * DELETE /api/task/:id
 */
export default defineEventHandler(async (event) => {
  try {
    // 获取路径参数中的任务 ID
    const id = parseInt(event.context.params?.id || "", 10);
    
    // 验证 ID 是否有效
    if (isNaN(id)) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Invalid task ID",
        }),
      );
    }

    // 执行删除操作
    const result = await db.delete(tasks).where(eq(tasks.id, id));

    // 检查是否删除成功
    if (result.rowsAffected === 0) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: "Task not found",
        }),
      );
    }

    // 返回成功响应
    return {
      success: true,
      message: "Task deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting task:", error);
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Internal server error",
      }),
    );
  }
});
```

## 8. 实现步骤
### 步骤 1：完善前端删除功能
1. 在 `app/pages/index.vue` 中添加 `refresh` 方法到 `useFetch` 解构
2. 创建 `deleteTask` 函数，接收任务 ID 参数
3. 使用 `confirm()` 弹出确认对话框
4. 调用 `$fetch` 发送 DELETE 请求到 `/api/task/:id`
5. 删除成功后调用 `refresh()` 刷新任务列表
6. 添加错误处理和用户提示

### 步骤 2：创建后端删除 API
1. 创建文件 `server/api/task.delete.ts`
2. 导入数据库实例、schema 和 eq 操作符
3. 从 `event.context.params` 获取任务 ID
4. 验证 ID 有效性
5. 使用 Drizzle ORM 执行删除操作
6. 返回合适的 HTTP 状态码和响应

### 步骤 3：测试功能
1. 启动开发服务器
2. 访问首页查看任务列表
3. 点击删除按钮测试删除功能
4. 验证确认弹窗、删除成功提示和列表刷新

## 9. 测试用例
1. 正常删除存在的任务
2. 删除不存在的任务（应返回 404）
3. 网络异常时的错误处理
4. 确认取消删除操作

## 10. 验收标准
- 用户可以成功删除任务
- 删除后页面自动更新
- 提供明确的操作反馈
- 错误处理友好

## 11. 优先级
高优先级，核心功能之一