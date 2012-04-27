/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var cc = cc = cc || {};

cc.clone = function(obj)
{
    var c = {};
    for ( var i in obj )
    {
        //var v = this[i];
        switch(typeof obj[i])
        {
            case 'object':
                c[i] = cc.clone(obj[i]);
                break;
            case 'Array':
                c[i] = obj[i].slice();
                break;
            default:
                c[i] = obj[i];
        }
    }
    return c;
};



/**
 @brief Output Debug message.
 */
cc.Log = function (message) {
    console.log(message);
};

/**
 @brief Pop out a message box
 */
cc.MessageBox = function (message) {
    console.log(message);
};

// cocos2d debug
if (cc.COCOS2D_DEBUG == 0) {
    cc.LOG = function () {
    };
    cc.LOGINFO = function () {
    };
    cc.LOGERROR = function () {
    };
}
else if (cc.COCOS2D_DEBUG == 1) {
    cc.LOG = cc.Log;
    cc.LOGINFO = cc.Log;
    cc.LOGERROR = function () {
    };
}
else if (cc.COCOS2D_DEBUG > 1) {
    cc.LOG = cc.Log;
    cc.LOGINFO = cc.Log;
    cc.LOGERROR = cc.Log;
}// COCOS2D_DEBUG

if (cc._DEBUG) {
    cc.Assert = function (cond, message) {
        if (!cond) {
            if (message) {
                alert(message);
            }
            /*else{
             alert("No message!");
             }*/
        }
    }
}
else {
    cc.Assert = function () {
    };
}
/**
 @brief Enum the language type supportted now
 */
cc.kLanguageEnglish = 0;
cc.kLanguageChinese = 1;
cc.kLanguageFrench = 2;
cc.kLanguageItalian = 3;
cc.kLanguageGerman = 4;
cc.kLanguageSpanish = 5;
cc.kLanguageRussian = 6;
