class ResponseModel:
    def __init__(self, message="", attributes={}):
        self.message = message
        self.attributes = attributes

    def to_json(self):
        return {"message": self.message, "attributes": self.attributes}
