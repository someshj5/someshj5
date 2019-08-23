"""
    File transfer using boto3 at S3 bucket
"""
import boto3


class S3Upload:
    """
    The Class for S3 file uploading at S3 bucket
    """
    def __init__(self):
        self.s3 = boto3.client('s3')

    def transfer(self, image):
        """
        This method uploads the image file to the S3 bucket
        :param image: image file to be uploaded
        :return: returns True
        """
        imagename = image.name
        self.s3.upload_fileobj(image, 'somesh-static', str(imagename))

        url = '{}.{}/{}'.format('somesh-static', self.s3.meta.endpoint_url,  imagename)
        # "https://somesh-static.s3.ap-south-1.amazonaws.com/nature.jpeg"
        # "https://somesh-static.s3.ap-south-1.amazonaws.com/nature.jpeg"
        print(url)
        return url
