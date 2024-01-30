from rest_framework import serializers
from .models import Post, Reply

class PostSerializer(serializers.ModelSerializer):
    num_replies = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['title', 'content', 'id', 'num_replies']

    def get_num_replies(self, obj):
        return obj.replies.count()

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['content']

class ReplyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__' #['content']
