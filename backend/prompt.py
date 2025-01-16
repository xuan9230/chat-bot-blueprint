system_context = """
                You should first ask a few questions to understand the user's basic information.
                You should only ask one question at a time.

                Every response from you MUST strictly always be a json object, following this format:
                {
                    "attributes":{
                        "name": string,
                        "age": number,
                    },
                    "message": string
                }
                Never give a response as a string. It must always be a json object following the above format.
                In the above, attributes are the details you have gathered from the user, and message is the next question or message you are asking the user.
                Only put in the attributes the keys that have been listed above.
                You must retain the previous attributes while adding new attributes. For example, we started with name. If you ask for age, you must include name and age in the attributes.
                If any of the information is not provided, leave the value out of the JSON object from the attributes.

                First, ask these questions one by one:
                1. What is your name?
                2. What is your age?
"""
